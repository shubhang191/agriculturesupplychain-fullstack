package com.example.agriculturesupplychain.dto;

/**
 * Report (b): Farmer network — inner join of Farmer, Supplier, RegionalCoop.
 * Shows which farmer is supplied by whom and belongs to which coop.
 */
public class FarmerNetworkReportDTO {
    private Integer farmerId;
    private String farmerName;
    private String email;
    private String phone;
    private String farmLocation;
    private Integer supplierId;
    private String supplierName;
    private String supplierType;
    private String supplierLocation;
    private Integer coopId;
    private String coopName;
    private String state;

    public FarmerNetworkReportDTO(Integer farmerId, String farmerName, String email,
            String phone, String farmLocation, Integer supplierId, String supplierName,
            String supplierType, String supplierLocation, Integer coopId,
            String coopName, String state) {
        this.farmerId = farmerId;
        this.farmerName = farmerName;
        this.email = email;
        this.phone = phone;
        this.farmLocation = farmLocation;
        this.supplierId = supplierId;
        this.supplierName = supplierName;
        this.supplierType = supplierType;
        this.supplierLocation = supplierLocation;
        this.coopId = coopId;
        this.coopName = coopName;
        this.state = state;
    }

    public Integer getFarmerId() { return farmerId; }
    public String getFarmerName() { return farmerName; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getFarmLocation() { return farmLocation; }
    public Integer getSupplierId() { return supplierId; }
    public String getSupplierName() { return supplierName; }
    public String getSupplierType() { return supplierType; }
    public String getSupplierLocation() { return supplierLocation; }
    public Integer getCoopId() { return coopId; }
    public String getCoopName() { return coopName; }
    public String getState() { return state; }
}
