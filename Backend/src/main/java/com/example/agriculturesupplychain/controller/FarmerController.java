package com.example.agriculturesupplychain.controller;

import com.example.agriculturesupplychain.dto.FarmerRequest;
import com.example.agriculturesupplychain.entity.Farmer;
import com.example.agriculturesupplychain.service.FarmerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/farmer")
public class FarmerController {
    private final FarmerService farmerService;
    public FarmerController(FarmerService farmerService){
        this.farmerService = farmerService;
    }
    @PostMapping
    public ResponseEntity<Farmer> create(@RequestBody FarmerRequest farmerRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(farmerService.createFarmer(farmerRequest));
    }
    @GetMapping("/{farmerId}")
    public ResponseEntity<Farmer> findById(@PathVariable("farmerId") Integer id){
        return ResponseEntity.ok(farmerService.selectFarmerById(id));
    }
    @GetMapping
    public ResponseEntity<List<Farmer>> findAll(){
        return ResponseEntity.ok(farmerService.selectAllFarmers());
    }
    @PutMapping("/{farmerId}")
    public ResponseEntity<Farmer> update(@PathVariable("farmerId") Integer id, @RequestBody FarmerRequest farmerRequest){
        return ResponseEntity.ok(farmerService.updateFarmer(id, farmerRequest));
    }
    @DeleteMapping("/{farmerId}")
    public ResponseEntity<Void> delete(@PathVariable("farmerId") Integer id){
        farmerService.deleteFarmer(id);
        return ResponseEntity.noContent().build();
    }
}
