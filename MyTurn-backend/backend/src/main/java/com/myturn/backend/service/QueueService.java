package com.myturn.backend.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.myturn.backend.dto.AdminStatsResponse;
import com.myturn.backend.dto.CheckinRequest;
import com.myturn.backend.dto.CheckinResponse;
import com.myturn.backend.dto.QueueStatsResponse;
import com.myturn.backend.model.Ticket;
import com.myturn.backend.repo.TicketRepository;

@Service
public class QueueService {

    private final TicketRepository repo;

    public QueueService(TicketRepository repo) {
        this.repo = repo;
    }

    // ================= CHECK-IN =================
    public CheckinResponse checkin(CheckinRequest req) {

        LocalDateTime todayStart = LocalDateTime.now()
                .withHour(0).withMinute(0).withSecond(0).withNano(0);

        List<Ticket> existing = repo
                .findByOrgTypeAndOrgNameAndServiceIdAndCreatedAtAfter(
                        req.getOrgType(),
                        req.getOrgName(),
                        req.getServiceId(),
                        todayStart
                );

        int token = existing.size() + 1;

        Ticket t = new Ticket();
        t.setOrgType(req.getOrgType());
        t.setOrgName(req.getOrgName());
        t.setServiceId(req.getServiceId());
        t.setCustomerName(req.getCustomerName());
        t.setPhone(req.getPhone());
        t.setTokenNumber(token);
        t.setCreatedAt(LocalDateTime.now());

        // ✅ Only one ACTIVE per queue
        boolean hasActive = existing.stream()
                .anyMatch(x -> "ACTIVE".equals(x.getStatus()));

        t.setStatus(hasActive ? "WAITING" : "ACTIVE");

        repo.save(t);

        long waitingAhead = existing.stream()
                .filter(x -> "WAITING".equals(x.getStatus()))
                .count();

        return new CheckinResponse(
                token,
                "Booking Confirmed",
                "QR-" + token,
                waitingAhead,
                existing.size()
        );
    }

    // ================= ETA (AI BASED) =================
    public QueueStatsResponse getStats(String orgType, String orgName, String serviceId) {

        LocalDateTime todayStart = LocalDateTime.now()
                .withHour(0).withMinute(0).withSecond(0).withNano(0);

        List<Ticket> tickets = repo
                .findByOrgTypeAndOrgNameAndServiceIdAndCreatedAtAfter(
                        orgType, orgName, serviceId, todayStart
                );

        long waiting = tickets.stream()
                .filter(t -> "WAITING".equals(t.getStatus()))
                .count();

        double avg = tickets.stream()
                .filter(t -> "COMPLETED".equals(t.getStatus()) && t.getCompletedAt() != null)
                .mapToLong(t -> Duration.between(t.getCreatedAt(), t.getCompletedAt()).toMinutes())
                .average()
                .orElse(5);

        long eta = (long) (waiting * avg);

        return new QueueStatsResponse(waiting, eta + " mins", "AI Estimated");
    }

    // ================= COMPLETE =================
    public void completeTicket(Long id) {

        Ticket t = repo.findById(id).orElseThrow();

        t.setStatus("COMPLETED");
        t.setCompletedAt(LocalDateTime.now());
        repo.save(t);

        // ✅ ONLY SAME QUEUE
        List<Ticket> waiting = repo
                .findByOrgTypeAndOrgNameAndServiceIdAndStatusOrderByCreatedAtAsc(
                        t.getOrgType(),
                        t.getOrgName(),
                        t.getServiceId(),
                        "WAITING"
                );

        if (!waiting.isEmpty()) {
            Ticket next = waiting.get(0);
            next.setStatus("ACTIVE");
            repo.save(next);
        }
    }

    // ================= LISTS =================
    public List<Ticket> getWaitingTickets() {
        return repo.findByStatusOrderByCreatedAtAsc("WAITING");
    }

    public List<Ticket> getActiveTickets() {
        return repo.findByStatus("ACTIVE");
    }

    public List<Ticket> getCompletedTickets() {
        return repo.findByStatus("COMPLETED");
    }

    // ================= ADMIN STATS =================
    public AdminStatsResponse getAdminStats() {

        LocalDateTime todayStart = LocalDateTime.now()
                .withHour(0).withMinute(0).withSecond(0).withNano(0);

        List<Ticket> all = repo.findAll()
                .stream()
                .filter(t -> t.getCreatedAt().isAfter(todayStart))
                .collect(Collectors.toList());

        long total = all.size();

        long completed = all.stream()
                .filter(t -> "COMPLETED".equals(t.getStatus()))
                .count();

        long waiting = all.stream()
                .filter(t -> "WAITING".equals(t.getStatus()))
                .count();

        return new AdminStatsResponse(total, completed, waiting);
    }
}