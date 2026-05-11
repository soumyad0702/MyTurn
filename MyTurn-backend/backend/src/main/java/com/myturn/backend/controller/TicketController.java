package com.myturn.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.myturn.backend.dto.AdminStatsResponse;
import com.myturn.backend.dto.CheckinRequest;
import com.myturn.backend.dto.CheckinResponse;
import com.myturn.backend.dto.QueueStatsResponse;
import com.myturn.backend.model.Ticket;
import com.myturn.backend.service.QueueService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class TicketController {

    private final QueueService service;

    public TicketController(QueueService service) {
        this.service = service;
    }

    @PostMapping("/checkin")
    public CheckinResponse checkin(@RequestBody CheckinRequest req) {
        return service.checkin(req);
    }

    @GetMapping("/stats")
    public QueueStatsResponse getStats(
            @RequestParam String orgType,
            @RequestParam String orgName,
            @RequestParam String serviceId
    ) {
        return service.getStats(orgType, orgName, serviceId);
    }

    @GetMapping("/admin/waiting")
    public List<Ticket> getWaiting() {
        return service.getWaitingTickets();
    }

    @GetMapping("/admin/active")
    public List<Ticket> getActive() {
        return service.getActiveTickets();
    }

    @GetMapping("/admin/completed")
    public List<Ticket> getCompleted() {
        return service.getCompletedTickets();
    }

    @PostMapping("/admin/complete/{id}")
    public void complete(@PathVariable Long id) {
        service.completeTicket(id);
    }

    @GetMapping("/admin/stats")
    public AdminStatsResponse getAdminStats() {
        return service.getAdminStats();
    }
}