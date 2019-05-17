package com.entity;

public class Store {
    String id;
    String storeCode;
    String storePosword;
    String storeName;

    public Store(String id, String storeCode, String storePosword, String storeName) {
        this.id = id;
        this.storeCode = storeCode;
        this.storePosword = storePosword;
        this.storeName = storeName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStoreCode() {
        return storeCode;
    }

    public void setStoreCode(String storeCode) {
        this.storeCode = storeCode;
    }

    public String getStorePosword() {
        return storePosword;
    }

    public void setStorePosword(String storePosword) {
        this.storePosword = storePosword;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    @Override
    public String toString() {
        return "Store{" +
                "id='" + id + '\'' +
                ", storeCode='" + storeCode + '\'' +
                ", storePosword='" + storePosword + '\'' +
                ", storeName='" + storeName + '\'' +
                '}';
    }
}
