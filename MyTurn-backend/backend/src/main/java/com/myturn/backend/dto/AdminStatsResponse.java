package com.myturn.backend.dto;

public class AdminStatsResponse {

    private long total;
    private long completed;
    private long waiting;

    public AdminStatsResponse() {}

    public AdminStatsResponse(long total, long completed, long waiting) {
        this.total = total;
        this.completed = completed;
        this.waiting = waiting;
    }

    public long getTotal() { return total; }
    public long getCompleted() { return completed; }
    public long getWaiting() { return waiting; }
}