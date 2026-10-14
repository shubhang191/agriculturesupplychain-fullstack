package com.example.agriculturesupplychain.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Report (d): LEFT JOIN — all buyers with their shipments.
 * Buyers with no shipments still appear (shipment columns will be null).
 */
public class BuyerShipmentsReportDTO {
    private Integer buyerId;
    private String buyerName;
    private String buyerType;
    private String location;
    private Integer shipmentId;
    private LocalDate shipmentDate;
    private BigDecimal quantityTons;
    private String shipmentStatus;

    public BuyerShipmentsReportDTO(Integer buyerId, String buyerName, String buyerType,
            String location, Integer shipmentId, LocalDate shipmentDate,
            BigDecimal quantityTons, String shipmentStatus) {
        this.buyerId = buyerId;
        this.buyerName = buyerName;
        this.buyerType = buyerType;
        this.location = location;
        this.shipmentId = shipmentId;
        this.shipmentDate = shipmentDate;
        this.quantityTons = quantityTons;
        this.shipmentStatus = shipmentStatus;
    }

    public Integer getBuyerId() { return buyerId; }
    public String getBuyerName() { return buyerName; }
    public String getBuyerType() { return buyerType; }
    public String getLocation() { return location; }
    public Integer getShipmentId() { return shipmentId; }
    public LocalDate getShipmentDate() { return shipmentDate; }
    public BigDecimal getQuantityTons() { return quantityTons; }
    public String getShipmentStatus() { return shipmentStatus; }
}
