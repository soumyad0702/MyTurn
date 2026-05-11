package com.myturn.backend.dto;

public class QueueStatsResponse {

    private long waitingCount;
    private String estimatedTime;
    private String message;

    public QueueStatsResponse() {}

    public QueueStatsResponse(long waitingCount, String estimatedTime, String message) {
        this.waitingCount = waitingCount;
        this.estimatedTime = estimatedTime;
        this.message = message;
    }

    public long getWaitingCount() {
        return waitingCount;
    }

    public void setWaitingCount(long waitingCount) {
        this.waitingCount = waitingCount;
    }

    public String getEstimatedTime() {
        return estimatedTime;
    }

    public void setEstimatedTime(String estimatedTime) {
        this.estimatedTime = estimatedTime;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}