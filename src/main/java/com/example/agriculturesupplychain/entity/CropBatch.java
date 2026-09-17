package com.example.agriculturesupplychain.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "crop_batch")
public class CropBatch {
    @Id
    @Column(name = "batch_no")
    private String batchNo;
    @Column(name = "crop_type", nullable = false)
    private String cropType;
    @Column(name = "quality_grade")
    private String qualityGrade;
    @Column(name = "price_per_ton")
    private BigDecimal pricePerTon;
    @Column(name = "harvest_date")
    private LocalDate harvestDate;
    @ManyToOne
    @JoinColumn(name = "storage_id")
    private StorageFacility storageFacility;
    public CropBatch() {
    }
    public CropBatch(String batchNo, String cropType, String qualityGrade, BigDecimal pricePerTon, LocalDate harvestDate, StorageFacility storageFacility) {
        this.batchNo = batchNo;
        this.cropType = cropType;
        this.qualityGrade = qualityGrade;
        this.pricePerTon = pricePerTon;
        this.harvestDate = harvestDate;
        this.storageFacility = storageFacility;
    }
    public String getBatchNo() {
        return batchNo;
    }
    public void setBatchNo(String batchNo) {
        this.batchNo = batchNo;
    }
    public String getCropType() {
        return cropType;
    }
    public void setCropType(String cropType) {
        this.cropType = cropType;
    }
    public String getQualityGrade() {
        return qualityGrade;
    }
    public void setQualityGrade(String qualityGrade) {
        this.qualityGrade = qualityGrade;
    }
    public BigDecimal getPricePerTon() {
        return pricePerTon;
    }
    public void setPricePerTon(BigDecimal pricePerTon) {
        this.pricePerTon = pricePerTon;
    }
    public LocalDate getHarvestDate() {
        return harvestDate;
    }
    public void setHarvestDate(LocalDate harvestDate) {
        this.harvestDate = harvestDate;
    }
    public StorageFacility getStorageFacility() {
        return storageFacility;
    }
    public void setStorageFacility(StorageFacility storageFacility) {
        this.storageFacility = storageFacility;
    }
}
