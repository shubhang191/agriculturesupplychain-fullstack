package com.example.agriculturesupplychain.dto;

import java.math.BigDecimal;

/**
 * Report (e): JOIN + GROUP BY — total tons shipped per buyer.
 * Uses COALESCE so buyers with zero shipments show 0 instead of null.
 */
public class BuyerTonnageReportDTO {
    private Integer buyerId;
    private String buyerName;
    private String buyerType;
    private String location;
    private BigDecimal totalTons;
    private Long shipmentCount;

    public BuyerTonnageReportDTO(Integer buyerId, String buyerName, String buyerType,
            String location, BigDecimal totalTons, Long shipmentCount) {
        this.buyerId = buyerId;
        this.buyerName = buyerName;
        this.buyerType = buyerType;
        this.location = location;
        this.totalTons = totalTons;
        this.shipmentCount = shipmentCount;
    }

    public Integer getBuyerId() { return buyerId; }
    public String getBuyerName() { return buyerName; }
    public String getBuyerType() { return buyerType; }
    public String getLocation() { return location; }
    public BigDecimal getTotalTons() { return totalTons; }
    public Long getShipmentCount() { return shipmentCount; }
}
