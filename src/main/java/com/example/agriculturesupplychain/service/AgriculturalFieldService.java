package com.example.agriculturesupplychain.service;

import com.example.agriculturesupplychain.dto.AgriculturalFieldRequest;
import com.example.agriculturesupplychain.entity.AgriculturalField;
import com.example.agriculturesupplychain.entity.Farmer;
import com.example.agriculturesupplychain.exception.ResourceNotFoundException;
import com.example.agriculturesupplychain.repository.AgriculturalFieldRepository;
import com.example.agriculturesupplychain.repository.FarmerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgriculturalFieldService {
    private final AgriculturalFieldRepository agriculturalFieldRepository;
    private final FarmerRepository farmerRepository;
    private static final Logger logger = LoggerFactory.getLogger(AgriculturalFieldService.class);
    public AgriculturalFieldService(AgriculturalFieldRepository agriculturalFieldRepository, FarmerRepository farmerRepository){
        this.agriculturalFieldRepository = agriculturalFieldRepository;
        this.farmerRepository = farmerRepository;
    }
    public AgriculturalField createField(AgriculturalFieldRequest request){
        Farmer farmer = farmerRepository.findById(request.getFarmerId())
                .orElseThrow(() -> new ResourceNotFoundException("Farmer not found: " + request.getFarmerId()));
        AgriculturalField field = new AgriculturalField();
        field.setFieldId(request.getFieldId());
        field.setFieldName(request.getFieldName());
        field.setAcreage(request.getAcreage());
        field.setCropType(request.getCropType());
        field.setFarmer(farmer);
        return agriculturalFieldRepository.save(field);
    }
    public AgriculturalField selectFieldById(Integer id){
        return agriculturalFieldRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No field with id " + id + " found"));
    }
    public List<AgriculturalField> selectAllFields(){
        return agriculturalFieldRepository.findAll();
    }
    public AgriculturalField updateField(Integer id, AgriculturalFieldRequest request){
        AgriculturalField field = agriculturalFieldRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No field with id " + id + " found"));
        Farmer farmer = farmerRepository.findById(request.getFarmerId())
                .orElseThrow(() -> new ResourceNotFoundException("Farmer not found: " + request.getFarmerId()));
        field.setFieldName(request.getFieldName());
        field.setAcreage(request.getAcreage());
        field.setCropType(request.getCropType());
        field.setFarmer(farmer);
        return agriculturalFieldRepository.save(field);
    }
    public void deleteField(Integer id){
        AgriculturalField field = agriculturalFieldRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No field with id " + id + " found"));
        agriculturalFieldRepository.delete(field);
        logger.info("Deleted field with id {}", id);
    }
}
