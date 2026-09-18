package com.example.agriculturesupplychain.service;

import com.example.agriculturesupplychain.dto.FarmerRequest;
import com.example.agriculturesupplychain.entity.Farmer;
import com.example.agriculturesupplychain.entity.RegionalCoop;
import com.example.agriculturesupplychain.entity.Supplier;
import com.example.agriculturesupplychain.exception.ResourceNotFoundException;
import com.example.agriculturesupplychain.repository.FarmerRepository;
import com.example.agriculturesupplychain.repository.RegionalCoopRepository;
import com.example.agriculturesupplychain.repository.SupplierRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FarmerService {
    private final FarmerRepository farmerRepository;
    private final SupplierRepository supplierRepository;
    private final RegionalCoopRepository regionalCoopRepository;
    private static final Logger logger = LoggerFactory.getLogger(FarmerService.class);
    public FarmerService(FarmerRepository farmerRepository, SupplierRepository supplierRepository, RegionalCoopRepository regionalCoopRepository){
        this.farmerRepository = farmerRepository;
        this.regionalCoopRepository = regionalCoopRepository;
        this.supplierRepository = supplierRepository;
    }
    public Farmer createFarmer(FarmerRequest farmerRequest){
        Supplier supplier = supplierRepository.findById(farmerRequest.getSupplierId())
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found supplierId: " + farmerRequest.getSupplierId()));
        RegionalCoop regionalCoop = regionalCoopRepository.findById(farmerRequest.getCoopId())
                .orElseThrow(() -> new ResourceNotFoundException("Regional Coop Not found CoopId: " + farmerRequest.getCoopId()));
        Farmer farmer = new Farmer();
        farmer.setFarmerId(farmerRequest.getFarmerId());
        farmer.setFarmerName(farmerRequest.getFarmerName());
        farmer.setEmail(farmerRequest.getEmail());
        farmer.setPhone(farmerRequest.getPhone());
        farmer.setFarmLocation(farmerRequest.getFarmLocation());
        farmer.setSupplier(supplier);
        farmer.setRegionalCoop(regionalCoop);
        return farmerRepository.save(farmer);
    }
    public Farmer selectFarmerById(Integer id){
        return farmerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Farmer with id " + id + " Not found"));
    }
    public List<Farmer> selectAllFarmers(){
        return farmerRepository.findAll();
    }
    public Farmer updateFarmer(Integer id, FarmerRequest farmerRequest){
        Farmer farmer = farmerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Farmer not found" + id));
        Supplier supplier = supplierRepository.findById(farmerRequest.getSupplierId())
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found" + farmerRequest.getSupplierId()));
        RegionalCoop regionalCoop = regionalCoopRepository.findById(farmerRequest.getCoopId())
                .orElseThrow(() -> new ResourceNotFoundException("Regional Coop Not found" + farmerRequest.getCoopId()));
        farmer.setFarmerName(farmerRequest.getFarmerName());
        farmer.setEmail(farmerRequest.getEmail());
        farmer.setPhone(farmerRequest.getPhone());
        farmer.setFarmLocation(farmerRequest.getFarmLocation());
        farmer.setSupplier(supplier);
        farmer.setRegionalCoop(regionalCoop);
        return farmerRepository.save(farmer);
    }
    public void deleteFarmer(Integer id){
        Farmer farmer = farmerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Farmer not found" + id));
        farmerRepository.delete(farmer);
        logger.info("Deleted farmer with id {}", id);
    }
}
