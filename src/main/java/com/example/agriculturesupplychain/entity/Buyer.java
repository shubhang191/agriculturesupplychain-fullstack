package com.example.agriculturesupplychain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "buyer")
public class Buyer {
    @Id
    @Column(name = "buyer_id")
    private Integer buyerId;
    @Column(name = "buyer_name", nullable = false)
    private String buyerName;
    @Column(name = "buyer_type")
    private String buyerType;
    @Column(name = "phone")
    private String phone;
    @Column(name = "location")
    private String location;
    public Buyer(){
    }
    public Buyer(Integer buyerId, String buyerName, String buyerType, String phone, String location) {
        this.buyerId = buyerId;
        this.buyerName = buyerName;
        this.buyerType = buyerType;
        this.phone = phone;
        this.location = location;
    }
    public Integer getBuyerId() {
        return buyerId;
    }
    public void setBuyerId(Integer buyerId) {
        this.buyerId = buyerId;
    }
    public String getBuyerName() {
        return buyerName;
    }
    public void setBuyerName(String buyerName) {
        this.buyerName = buyerName;
    }
    public String getBuyerType() {
        return buyerType;
    }
    public void setBuyerType(String buyerType) {
        this.buyerType = buyerType;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
}
