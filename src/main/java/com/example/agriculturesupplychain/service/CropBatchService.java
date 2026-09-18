package com.example.agriculturesupplychain.service;

import com.example.agriculturesupplychain.dto.CropBatchRequest;
import com.example.agriculturesupplychain.entity.CropBatch;
import com.example.agriculturesupplychain.entity.StorageFacility;
import com.example.agriculturesupplychain.exception.ResourceNotFoundException;
import com.example.agriculturesupplychain.repository.CropBatchRepository;
import com.example.agriculturesupplychain.repository.StorageFacilityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CropBatchService {
    private final CropBatchRepository cropBatchRepository;
    private final StorageFacilityRepository storageFacilityRepository;
    private static final Logger logger = LoggerFactory.getLogger(CropBatchService.class);
    public CropBatchService(CropBatchRepository cropBatchRepository, StorageFacilityRepository storageFacilityRepository){
        this.cropBatchRepository = cropBatchRepository;
        this.storageFacilityRepository = storageFacilityRepository;
    }
    public CropBatch createCropBatch(CropBatchRequest cropBatchRequest){
        StorageFacility storageFacility = storageFacilityRepository.findById(cropBatchRequest.getStorageId())
                .orElseThrow(() -> new ResourceNotFoundException("storage facility not found: " + cropBatchRequest.getStorageId()));
        CropBatch cropBatch = new CropBatch();
        cropBatch.setBatchNo(cropBatchRequest.getBatchNo());
        cropBatch.setCropType(cropBatchRequest.getCropType());
        cropBatch.setQualityGrade(cropBatchRequest.getQualityGrade());
        cropBatch.setPricePerTon(cropBatchRequest.getPricePerTon());
        cropBatch.setHarvestDate(cropBatchRequest.getHarvestDate());
        cropBatch.setStorageFacility(storageFacility);
        return cropBatchRepository.save(cropBatch);
    }
    public CropBatch selectCropBatchByBatchNo(String no){
        return cropBatchRepository.findById(no).orElseThrow(() -> new ResourceNotFoundException("crop batch with batch no " + no + " not found"));
    }
    public List<CropBatch> selectAll(){
        return cropBatchRepository.findAll();
    }
    public CropBatch updateCropBatch(String no, CropBatchRequest cropBatchRequest){
        CropBatch cropBatch = cropBatchRepository.findById(no)
                .orElseThrow(() -> new ResourceNotFoundException("crop batch with batch no " + no + " not found"));
        StorageFacility storageFacility = storageFacilityRepository.findById(cropBatchRequest.getStorageId())
                .orElseThrow(() -> new ResourceNotFoundException("storage facility not found: " + cropBatchRequest.getStorageId()));
        cropBatch.setCropType(cropBatchRequest.getCropType());
        cropBatch.setQualityGrade(cropBatchRequest.getQualityGrade());
        cropBatch.setPricePerTon(cropBatchRequest.getPricePerTon());
        cropBatch.setHarvestDate(cropBatchRequest.getHarvestDate());
        cropBatch.setStorageFacility(storageFacility);
        return cropBatchRepository.save(cropBatch);
    }
    public void deleteCropBatch(String no){
        CropBatch cropBatch = cropBatchRepository.findById(no)
                .orElseThrow(() -> new ResourceNotFoundException("crop batch with batch no " + no + " not found"));
        cropBatchRepository.delete(cropBatch);
        logger.info("Deleted crop batch with batch_no {}", no);
    }
}
