package com.entity;
import java.util.Date;

public class Record {
    String id;
    String orderNo;
    String storeCode;
    String storeName;
    String  dateKey;
    String transTypeName;
    Double totalAmt;
    Double totalNet;
    String paymentTypeName;
    String orderDetailid;
    String status;
    String sendTime;
    String transDate;
    String prodCode;
    String unitprice;
    String quantity;
    public Record() {
    }

    public Record(String id, String orderNo, String storeCode, String storeName, String dateKey, String transTypeName, Double totalAmt, Double totalNet, String paymentTypeName, String orderDetailid, String status, String sendTime,  String transDate, String prodCode, String unitprice, String quantity) {
        this.id = id;
        this.orderNo = orderNo;
        this.storeCode = storeCode;
        this.storeName = storeName;
        this.dateKey = dateKey;
        this.transTypeName = transTypeName;
        this.totalAmt = totalAmt;
        this.totalNet = totalNet;
        this.paymentTypeName = paymentTypeName;
        this.orderDetailid = orderDetailid;
        this.status = status;
        this.sendTime = sendTime;
        this.transDate = transDate;
        this.prodCode = prodCode;
        this.unitprice = unitprice;
        this.quantity = quantity;
    }

    public String getProdCode() {
        return prodCode;
    }

    public void setProdCode(String prodCode) {
        this.prodCode = prodCode;
    }

    public String getUnitprice() {
        return unitprice;
    }

    public void setUnitprice(String unitprice) {
        this.unitprice = unitprice;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public  String getTransDate() {
        return transDate;
    }

    public void setTransDate( String transDate) {
        this.transDate = transDate;
    }

    public Double getTotalAmt() {
        return totalAmt;
    }

    public void setTotalAmt(Double totalAmt) {
        this.totalAmt = totalAmt;
    }

    public Double getTotalNet() {
        return totalNet;
    }

    public void setTotalNet(Double totalNet) {
        this.totalNet = totalNet;
    }

    public String getOrderDetailid() {
        return orderDetailid;
    }

    public void setOrderDetailid(String orderDetailid) {
        this.orderDetailid = orderDetailid;
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
    public String getDateKey() {
        return dateKey;
    }

    public void setDateKey(String dateKey) {
        this.dateKey = dateKey;
    }
    public String getTransTypeName() {
        return transTypeName;
    }

    public void setTransTypeName(String transTypeName) {
        this.transTypeName = transTypeName;
    }

    public String getPaymentTypeName() {
        return paymentTypeName;
    }

    public void setPaymentTypeName(String paymentTypeName) {
        this.paymentTypeName = paymentTypeName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSendTime() {
        return sendTime;
    }

    public void setSendTime(String sendTime) {
        this.sendTime = sendTime;
    }

    @Override
    public String toString() {
        return "Record{" +
                "id='" + id + '\'' +
                ", orderNo='" + orderNo + '\'' +
                ", storeCode='" + storeCode + '\'' +
                ", storeName='" + storeName + '\'' +
                ", dateKey='" + dateKey + '\'' +
                ", transTypeName='" + transTypeName + '\'' +
                ", totalAmt=" + totalAmt +
                ", totalNet=" + totalNet +
                ", paymentTypeName='" + paymentTypeName + '\'' +
                ", orderDetailid='" + orderDetailid + '\'' +
                ", status='" + status + '\'' +
                ", sendTime=" + sendTime +
                '}';
    }
}
