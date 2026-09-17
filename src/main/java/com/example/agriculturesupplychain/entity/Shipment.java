package com.example.agriculturesupplychain.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "shipment")
public class Shipment {
    @Id
    @Column(name = "shipment_id")
    private Integer shipmentId;
    @Column(name = "batch_no")
    private String batchNo;
    @Column(name = "shipment_date")
    private LocalDate date;
    @Column(name = "quantity_tons")
    private BigDecimal qty;
    @Column(name = "shipment_status")
    private String status;
    @ManyToOne
    @JoinColumn(name = "batch_no")
    CropBatch cropBatch;
    @ManyToOne
    @JoinColumn(name = "buyer_id")
    Buyer buyer;
    public Shipment() {
    }
    public Shipment(Integer shipmentId, String batchNo, LocalDate date, BigDecimal qty, String status, CropBatch cropBatch, Buyer buyer) {
        this.shipmentId = shipmentId;
        this.batchNo = batchNo;
        this.date = date;
        this.qty = qty;
        this.status = status;
        this.cropBatch = cropBatch;
        this.buyer = buyer;
    }
    public Integer getShipmentId() {
        return shipmentId;
    }
    public void setShipmentId(Integer shipmentId) {
        this.shipmentId = shipmentId;
    }
    public String getBatchNo() {
        return batchNo;
    }
    public void setBatchNo(String batchNo) {
        this.batchNo = batchNo;
    }
    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }
    public BigDecimal getQty() {
        return qty;
    }
    public void setQty(BigDecimal qty) {
        this.qty = qty;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public CropBatch getCropBatch() {
        return cropBatch;
    }
    public void setCropBatch(CropBatch cropBatch) {
        this.cropBatch = cropBatch;
    }
    public Buyer getBuyer() {
        return buyer;
    }
    public void setBuyer(Buyer buyer) {
        this.buyer = buyer;
    }
}
