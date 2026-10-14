package com.example.agriculturesupplychain.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Report (a): Shipment details — inner join of Shipment, CropBatch, Buyer.
 * Each constructor arg maps to a SELECT column in the JPQL query.
 */
public class ShipmentDetailsReportDTO {
    private Integer shipmentId;
    private LocalDate date;
    private BigDecimal qty;
    private String status;
    private String batchNo;
    private String cropType;
    private String qualityGrade;
    private BigDecimal pricePerTon;
    private Integer buyerId;
    private String buyerName;
    private String buyerType;
    private String buyerLocation;

    public ShipmentDetailsReportDTO(Integer shipmentId, LocalDate date, BigDecimal qty,
            String status, String batchNo, String cropType, String qualityGrade,
            BigDecimal pricePerTon, Integer buyerId, String buyerName,
            String buyerType, String buyerLocation) {
        this.shipmentId = shipmentId;
        this.date = date;
        this.qty = qty;
        this.status = status;
        this.batchNo = batchNo;
        this.cropType = cropType;
        this.qualityGrade = qualityGrade;
        this.pricePerTon = pricePerTon;
        this.buyerId = buyerId;
        this.buyerName = buyerName;
        this.buyerType = buyerType;
        this.buyerLocation = buyerLocation;
    }

    public Integer getShipmentId() { return shipmentId; }
    public LocalDate getDate() { return date; }
    public BigDecimal getQty() { return qty; }
    public String getStatus() { return status; }
    public String getBatchNo() { return batchNo; }
    public String getCropType() { return cropType; }
    public String getQualityGrade() { return qualityGrade; }
    public BigDecimal getPricePerTon() { return pricePerTon; }
    public Integer getBuyerId() { return buyerId; }
    public String getBuyerName() { return buyerName; }
    public String getBuyerType() { return buyerType; }
    public String getBuyerLocation() { return buyerLocation; }
}
