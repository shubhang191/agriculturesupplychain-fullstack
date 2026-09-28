package com.example.agriculturesupplychain.controller;

import com.example.agriculturesupplychain.dto.StorageFacilityRequest;
import com.example.agriculturesupplychain.entity.StorageFacility;
import com.example.agriculturesupplychain.service.StorageFacilityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/storageFacility")
public class StorageFacilityController {
    private final StorageFacilityService storageFacilityService;
    public StorageFacilityController(StorageFacilityService storageFacilityService){
        this.storageFacilityService = storageFacilityService;
    }
    @PostMapping
    public ResponseEntity<StorageFacility> create(@RequestBody StorageFacilityRequest storageFacilityRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(storageFacilityService.createStorageFacility(storageFacilityRequest));
    }
    @GetMapping("/{storageId}")
    public ResponseEntity<StorageFacility> findById(@PathVariable("storageId") Integer id){
        return ResponseEntity.ok(storageFacilityService.selectStorageFacilityById(id));
    }
    @GetMapping
    public ResponseEntity<List<StorageFacility>> findAll(){
        return ResponseEntity.ok(storageFacilityService.selectAllStorageFacility());
    }
    @PutMapping("/{storageId}")
    public ResponseEntity<StorageFacility> update(@PathVariable("storageId") Integer id, @RequestBody StorageFacilityRequest storageFacilityRequest){
        return ResponseEntity.ok(storageFacilityService.updateStorageFacility(id, storageFacilityRequest));
    }
    @DeleteMapping("/{storageId}")
    public ResponseEntity<Void> delete(@PathVariable("storageId") Integer id){
        storageFacilityService.deleteStorageFacility(id);
        return ResponseEntity.noContent().build();
    }
}
