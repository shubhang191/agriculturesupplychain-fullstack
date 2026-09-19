package com.example.agriculturesupplychain.dto;

import jakarta.persistence.Column;

import java.math.BigDecimal;

public class StorageFacilityRequest {
    private Integer storageId;
    private String storageName;
    private String location;
    private BigDecimal capacityTons;
    private Integer coopId;
    public Integer getStorageId() {
        return storageId;
    }
    public void setStorageId(Integer storageId) {
        this.storageId = storageId;
    }
    public String getStorageName() {
        return storageName;
    }
    public void setStorageName(String storageName) {
        this.storageName = storageName;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public BigDecimal getCapacityTons() {
        return capacityTons;
    }
    public void setCapacityTons(BigDecimal capacityTons) {
        this.capacityTons = capacityTons;
    }
    public Integer getCoopId() {
        return coopId;
    }
    public void setCoopId(Integer coopId) {
        this.coopId = coopId;
    }
}
