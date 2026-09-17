package com.example.agriculturesupplychain.entity;

import jakarta.persistence.*;

@Entity
public class Farmer {
    @Id
    @Column(name = "farmer_id")
    private Integer farmerId;
    @Column(name = "farmer_name", nullable = false)
    private String farmerName;
    @Column(name = "email", unique = true)
    private String email;
    @Column(name = "phone")
    private String phone;
    @Column(name = "farm_location")
    private String farmLocation;
    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;
    @ManyToOne
    @JoinColumn(name = "coop_id")
    private RegionalCoop regionalCoop;
    public Farmer(){
    }
    public Farmer(Integer farmerId, String farmerName, String email, String phone, String farmLocation, Supplier supplier, RegionalCoop regionalCoop) {
        this.farmerId = farmerId;
        this.farmerName = farmerName;
        this.email = email;
        this.phone = phone;
        this.farmLocation = farmLocation;
        this.supplier = supplier;
        this.regionalCoop = regionalCoop;
    }
    public void setFarmerId(Integer farmerId){
        this.farmerId = farmerId;
    }
    public Integer getFarmerId(){
        return farmerId;
    }
    public void setFarmerName(String farmerName){
        this.farmerName = farmerName;
    }
    public String getFarmerName(){
        return farmerName;
    }
    public void setEmail(String email){
        this.email = email;
    }
    public String getEmail(){
        return email;
    }
    public void setPhone(String phone){
        this.phone = phone;
    }
    public String getPhone(){
        return phone;
    }
    public void setFarmLocation(String farmLocation){
        this.farmLocation = farmLocation;
    }
    public String getFarmLocation(){
        return farmLocation;
    }
    public void setSupplier(Supplier supplier){
        this.supplier = supplier;
    }
    public Supplier getSupplier(){
        return supplier;
    }
    public void setRegionalCoop(RegionalCoop regionalCoop){
        this.regionalCoop = regionalCoop;
    }
    public RegionalCoop getRegionalCoop(){
        return regionalCoop;
    }
}
