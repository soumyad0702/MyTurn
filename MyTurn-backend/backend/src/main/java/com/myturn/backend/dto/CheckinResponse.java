package com.myturn.backend.dto;

public class CheckinResponse {

    private int tokenNumber;
    private String message;
    private String qrPayload;
    private long waitingAhead;
    private long totalInQueue;

    public CheckinResponse() {}

    public CheckinResponse(int tokenNumber, String message, String qrPayload, long waitingAhead, long totalInQueue) {
        this.tokenNumber = tokenNumber;
        this.message = message;
        this.qrPayload = qrPayload;
        this.waitingAhead = waitingAhead;
        this.totalInQueue = totalInQueue;
    }

    public int getTokenNumber() { return tokenNumber; }
    public void setTokenNumber(int tokenNumber) { this.tokenNumber = tokenNumber; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getQrPayload() { return qrPayload; }
    public void setQrPayload(String qrPayload) { this.qrPayload = qrPayload; }

    public long getWaitingAhead() { return waitingAhead; }
    public void setWaitingAhead(long waitingAhead) { this.waitingAhead = waitingAhead; }

    public long getTotalInQueue() { return totalInQueue; }
    public void setTotalInQueue(long totalInQueue) { this.totalInQueue = totalInQueue; }
}