package com.example.agriculturesupplychain.controller;

import com.example.agriculturesupplychain.dto.CropBatchRequest;
import com.example.agriculturesupplychain.entity.CropBatch;
import com.example.agriculturesupplychain.service.CropBatchService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CropBatchController {
    private final CropBatchService cropBatchService;
    public CropBatchController(CropBatchService cropBatchService){
        this.cropBatchService = cropBatchService;
    }
    @PostMapping
    public ResponseEntity<CropBatch> create(@RequestBody CropBatchRequest cropBatchRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(cropBatchService.createCropBatch(cropBatchRequest));
    }
    @GetMapping("/{cropBatchNo}")
    public ResponseEntity<CropBatch> findById(@PathVariable("cropBatchNo") String no){
        return ResponseEntity.ok(cropBatchService.selectCropBatchByBatchNo(no));
    }
    @GetMapping
    public ResponseEntity<List<CropBatch>> findAll(){
        return ResponseEntity.ok(cropBatchService.selectAll());
    }
    @PutMapping("/{cropBatchNo}")
    public ResponseEntity<CropBatch> update(@PathVariable("cropBatchNo") String no, @RequestBody CropBatchRequest cropBatchRequest){
        return ResponseEntity.ok(cropBatchService.updateCropBatch(no, cropBatchRequest));
    }
    @DeleteMapping("{cropBatchNo}")
    public ResponseEntity<Void> delete(@PathVariable("cropBatchNo") String no){
        cropBatchService.deleteCropBatch(no);
        return ResponseEntity.noContent().build();
    }
}
