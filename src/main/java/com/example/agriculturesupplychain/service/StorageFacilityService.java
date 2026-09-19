package com.example.agriculturesupplychain.service;

import com.example.agriculturesupplychain.dto.StorageFacilityRequest;
import com.example.agriculturesupplychain.entity.RegionalCoop;
import com.example.agriculturesupplychain.entity.StorageFacility;
import com.example.agriculturesupplychain.exception.ResourceNotFoundException;
import com.example.agriculturesupplychain.repository.RegionalCoopRepository;
import com.example.agriculturesupplychain.repository.StorageFacilityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StorageFacilityService {
    private final StorageFacilityRepository storageFacilityRepository;
    private final RegionalCoopRepository regionalCoopRepository;
    private static final Logger logger = LoggerFactory.getLogger(StorageFacilityService.class);
    public StorageFacilityService(StorageFacilityRepository storageFacilityRepository, RegionalCoopRepository regionalCoopRepository){
        this.storageFacilityRepository = storageFacilityRepository;
        this.regionalCoopRepository = regionalCoopRepository;
    }
    public StorageFacility createStorageFacility(StorageFacilityRequest storageFacilityRequest){
        RegionalCoop regionalCoop = regionalCoopRepository.findById(storageFacilityRequest.getCoopId()).orElseThrow(() -> new ResourceNotFoundException("Regional Coop with id: " + storageFacilityRequest.getCoopId() + " not found"));
        StorageFacility storageFacility = new StorageFacility();
        storageFacility.setStorageId(storageFacilityRequest.getStorageId());
        storageFacility.setStorageName(storageFacilityRequest.getStorageName());
        storageFacility.setCapacityTons(storageFacilityRequest.getCapacityTons());
        storageFacility.setLocation(storageFacilityRequest.getLocation());
        storageFacility.setRegionalCoop(regionalCoop);
        return storageFacilityRepository.save(storageFacility);
    }
    public StorageFacility selectStorageFacilityById(Integer id){
        return storageFacilityRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Storage Facility with id " + id + " not found"));
    }
    public List<StorageFacility> selectAllStorageFacility(){
        return storageFacilityRepository.findAll();
    }
    public StorageFacility updateStorageFacility(Integer id, StorageFacilityRequest storageFacilityRequest){
        StorageFacility storageFacility = storageFacilityRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Storage Facility with id " + id + " not found"));
        RegionalCoop regionalCoop = regionalCoopRepository.findById(storageFacilityRequest.getCoopId()).orElseThrow(() -> new ResourceNotFoundException("Regional Coop with id: " + storageFacilityRequest.getCoopId() + " not found"));
        storageFacility.setStorageName(storageFacilityRequest.getStorageName());
        storageFacility.setCapacityTons(storageFacilityRequest.getCapacityTons());
        storageFacility.setLocation(storageFacilityRequest.getLocation());
        storageFacility.setRegionalCoop(regionalCoop);
        return storageFacilityRepository.save(storageFacility);
    }
    public void deleteStorageFacility(Integer id){
        StorageFacility storageFacility = storageFacilityRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Storage Facility with id " + id + " not found"));
        storageFacilityRepository.delete(storageFacility);
        logger.info("Deleted Storage Facility with id {}", id);
    }
}
