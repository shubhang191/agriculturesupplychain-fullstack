package com.example.agriculturesupplychain.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class CropBatchRequest {
    private String batchNo;
    private String cropType;
    private String qualityGrade;
    private BigDecimal pricePerTon;
    private LocalDate harvestDate;
    private Integer storageId;
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
    public Integer getStorageId() {
        return storageId;
    }
    public void setStorageId(Integer storageId) {
        this.storageId = storageId;
    }
}
