package com.example.agriculturesupplychain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

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
}
