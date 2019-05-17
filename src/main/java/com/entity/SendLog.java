package com.entity;

import java.util.Date;

public class SendLog {
    String id;
    String orderNo;
    String sendTime;
    String status;
    String reason;
    String storeCode;
    String storeName;

    public SendLog() {
    }

    public SendLog(String id, String orderNo, String sendTime, String status, String reason, String storeCode, String storeName) {
        this.id = id;
        this.orderNo = orderNo;
        this.sendTime = sendTime;
        this.status = status;
        this.reason = reason;
        this.storeCode = storeCode;
        this.storeName = storeName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public String getSendTime() {
        return sendTime;
    }

    public void setSendTime(String sendTime) {
        this.sendTime = sendTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getStoreCode() {
        return storeCode;
    }

    public void setStoreCode(String storeCode) {
        this.storeCode = storeCode;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }
}
