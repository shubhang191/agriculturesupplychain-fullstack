package com.example.agriculturesupplychain.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "storage_facility")
public class StorageFacility {
    @Id
    @Column(name = "storage_id")
    private Integer storageId;
    @Column(name = "storage_name", nullable = false)
    private String storageName;
    @Column(name = "location")
    private String location;
    @Column(name = "capacity_tons")
    private BigDecimal capacityTons;
    @ManyToOne
    @JoinColumn(name = "coop_id")
    private RegionalCoop regionalCoop;
    public StorageFacility(){
    }
    public StorageFacility(Integer storageId, String storageName, String location, BigDecimal capacityTons, RegionalCoop regionalCoop) {
        this.storageId = storageId;
        this.storageName = storageName;
        this.location = location;
        this.capacityTons = capacityTons;
        this.regionalCoop = regionalCoop;
    }
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
    public RegionalCoop getRegionalCoop() {
        return regionalCoop;
    }
    public void setRegionalCoop(RegionalCoop regionalCoop) {
        this.regionalCoop = regionalCoop;
    }
}
