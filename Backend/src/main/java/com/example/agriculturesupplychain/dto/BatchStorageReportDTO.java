package com.example.agriculturesupplychain.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Report (c): Batch storage — inner join of CropBatch, StorageFacility, RegionalCoop.
 * Shows where each crop batch is stored and which coop owns the facility.
 */
public class BatchStorageReportDTO {
    private String batchNo;
    private String cropType;
    private String qualityGrade;
    private BigDecimal pricePerTon;
    private LocalDate harvestDate;
    private Integer storageId;
    private String storageName;
    private String storageLocation;
    private BigDecimal capacityTons;
    private Integer coopId;
    private String coopName;
    private String state;

    public BatchStorageReportDTO(String batchNo, String cropType, String qualityGrade,
            BigDecimal pricePerTon, LocalDate harvestDate, Integer storageId,
            String storageName, String storageLocation, BigDecimal capacityTons,
            Integer coopId, String coopName, String state) {
        this.batchNo = batchNo;
        this.cropType = cropType;
        this.qualityGrade = qualityGrade;
        this.pricePerTon = pricePerTon;
        this.harvestDate = harvestDate;
        this.storageId = storageId;
        this.storageName = storageName;
        this.storageLocation = storageLocation;
        this.capacityTons = capacityTons;
        this.coopId = coopId;
        this.coopName = coopName;
        this.state = state;
    }

    public String getBatchNo() { return batchNo; }
    public String getCropType() { return cropType; }
    public String getQualityGrade() { return qualityGrade; }
    public BigDecimal getPricePerTon() { return pricePerTon; }
    public LocalDate getHarvestDate() { return harvestDate; }
    public Integer getStorageId() { return storageId; }
    public String getStorageName() { return storageName; }
    public String getStorageLocation() { return storageLocation; }
    public BigDecimal getCapacityTons() { return capacityTons; }
    public Integer getCoopId() { return coopId; }
    public String getCoopName() { return coopName; }
    public String getState() { return state; }
}
