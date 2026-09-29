package com.example.agriculturesupplychain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.math.BigDecimal;

@Entity
@Table(name = "regional_coop")
public class RegionalCoop {
    @Id
    @Column(name = "coop_id")
    private Integer coopId;
    @Column(name = "coop_name", nullable = false)
    private String coopName;
    @Column(name = "state")
    private String state;
    @Column(name = "silo_capacity_tons")
    private BigDecimal siloCapacityTons;
    public RegionalCoop(){
    }
    public RegionalCoop(Integer coopId, String coopName, String state, BigDecimal siloCapacityTons){
        this.coopId = coopId;
        this.coopName = coopName;
        this.state = state;
        this.siloCapacityTons = siloCapacityTons;
    }
    public void setCoopId(Integer coopId){
        this.coopId = coopId;
    }
    public Integer getCoopId(){
        return coopId;
    }
    public void setCoopName(String coopName){
        this.coopName = coopName;
    }
    public String getCoopName(){
        return coopName;
    }
    public void setState(String state){
        this.state = state;
    }
    public String getState(){
        return state;
    }
    public void setSiloCapacityTons(BigDecimal siloCapacityTons){
        this.siloCapacityTons = siloCapacityTons;
    }
    public BigDecimal getSiloCapacityTons(){
        return siloCapacityTons;
    }
}
