package com.example.agriculturesupplychain.dto;

import java.math.BigDecimal;

public class AgriculturalFieldRequest {
    private Integer fieldId;
    private String fieldName;
    private BigDecimal acreage;
    private String cropType;
    private Integer farmerId;
    public Integer getFieldId() {
        return fieldId;
    }
    public void setFieldId(Integer fieldId) {
        this.fieldId = fieldId;
    }
    public String getFieldName() {
        return fieldName;
    }
    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }
    public BigDecimal getAcreage() {
        return acreage;
    }
    public void setAcreage(BigDecimal acreage) {
        this.acreage = acreage;
    }
    public String getCropType() {
        return cropType;
    }
    public void setCropType(String cropType) {
        this.cropType = cropType;
    }
    public Integer getFarmerId() {
        return farmerId;
    }
    public void setFarmerId(Integer farmerId) {
        this.farmerId = farmerId;
    }
}
