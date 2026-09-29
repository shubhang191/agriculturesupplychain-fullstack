package com.example.agriculturesupplychain.dto;

import jakarta.persistence.Column;

public class FarmerRequest {
    private Integer farmerId;
    private String farmerName;
    private String email;
    private String phone;
    private String farmLocation;
    private Integer supplierId;
    private Integer coopId;
    public Integer getFarmerId() {
        return farmerId;
    }
    public void setFarmerId(Integer farmerId) {
        this.farmerId = farmerId;
    }
    public String getFarmerName() {
        return farmerName;
    }
    public void setFarmerName(String farmerName) {
        this.farmerName = farmerName;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getFarmLocation() {
        return farmLocation;
    }
    public void setFarmLocation(String farmLocation) {
        this.farmLocation = farmLocation;
    }
    public Integer getSupplierId() {
        return supplierId;
    }
    public void setSupplierId(Integer supplierId) {
        this.supplierId = supplierId;
    }
    public Integer getCoopId() {
        return coopId;
    }
    public void setCoopId(Integer coopId) {
        this.coopId = coopId;
    }
}

