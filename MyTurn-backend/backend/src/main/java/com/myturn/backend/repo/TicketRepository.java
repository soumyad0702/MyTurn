package com.myturn.backend.repo;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.myturn.backend.model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    List<Ticket> findByOrgTypeAndOrgNameAndServiceIdAndCreatedAtAfter(
            String orgType,
            String orgName,
            String serviceId,
            LocalDateTime createdAt
    );

    List<Ticket> findByStatusOrderByCreatedAtAsc(String status);

    List<Ticket> findByStatus(String status);

    // ✅ CRITICAL FIX
    List<Ticket> findByOrgTypeAndOrgNameAndServiceIdAndStatusOrderByCreatedAtAsc(
            String orgType,
            String orgName,
            String serviceId,
            String status
    );
}