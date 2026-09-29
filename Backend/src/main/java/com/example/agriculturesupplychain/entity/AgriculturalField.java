package com.example.agriculturesupplychain.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "agricultural_field")
public class AgriculturalField {
    @Id
    @Column(name = "field_id")
    private Integer fieldId;
    @Column(name = "field_name")
    private String fieldName;
    @Column(name = "acreage")
    private BigDecimal acreage;
    @Column(name = "crop_type")
    private String cropType;
    @ManyToOne
    @JoinColumn(name = "farmer_id")
    private Farmer farmer;
    public AgriculturalField() {
    }
    public AgriculturalField(Integer fieldId, String fieldName, BigDecimal acreage, String cropType, Farmer farmer) {
        this.fieldId = fieldId;
        this.fieldName = fieldName;
        this.acreage = acreage;
        this.cropType = cropType;
        this.farmer = farmer;
    }
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
    public Farmer getFarmer() {
        return farmer;
    }
    public void setFarmer(Farmer farmer) {
        this.farmer = farmer;
    }
}
