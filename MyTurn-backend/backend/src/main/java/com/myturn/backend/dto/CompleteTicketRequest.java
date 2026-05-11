package com.myturn.backend.dto;

public class CompleteTicketRequest {

    private Long ticketId;

    public CompleteTicketRequest() {}

    public Long getTicketId() {
        return ticketId;
    }

    public void setTicketId(Long ticketId) {
        this.ticketId = ticketId;
    }
}
