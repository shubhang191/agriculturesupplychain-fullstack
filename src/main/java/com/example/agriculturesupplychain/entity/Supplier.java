package com.example.agriculturesupplychain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "supplier")
public class Supplier {
    @Id
    @Column(name = "supplier_id")
    private Integer supplierId;
    @Column(name = "supplier_name", nullable = false)
    private String supplierName;
    @Column(name = "supplier_type")
    private String type;
    @Column(name = "phone")
    private String phone;
    @Column(name = "location")
    private String location;
    public Supplier(){
    }
    public Supplier(Integer supplierId, String supplierName, String type, String phone, String location) {
        this.supplierId = supplierId;
        this.supplierName = supplierName;
        this.type = type;
        this.phone = phone;
        this.location = location;
    }
    public void setSupplierId(Integer supplierId){
        this.supplierId = supplierId;
    }
    public Integer getSupplierId(){
        return supplierId;
    }
    public void setSupplierName(String supplierName){
        this.supplierName = supplierName;
    }
    public String getSupplierName(){
        return supplierName;
    }
    public void setType(String type){
        this.type = type;
    }
    public String getType(){
        return type;
    }
    public void setPhone(String phone){
        this.phone = phone;
    }
    public String getPhone(){
        return phone;
    }
    public void setLocation(String location){
        this.location = location;
    }
    public String getLocation(){
        return location;
    }
}
