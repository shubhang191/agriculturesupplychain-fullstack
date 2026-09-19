package com.example.agriculturesupplychain.controller;

import com.example.agriculturesupplychain.dto.AgriculturalFieldRequest;
import com.example.agriculturesupplychain.entity.AgriculturalField;
import com.example.agriculturesupplychain.service.AgriculturalFieldService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agriculturalField")
public class AgriculturalFieldController {
    private final AgriculturalFieldService agriculturalFieldService;
    public AgriculturalFieldController(AgriculturalFieldService agriculturalFieldService){
        this.agriculturalFieldService = agriculturalFieldService;
    }
    @PostMapping
    public ResponseEntity<AgriculturalField> create(@RequestBody AgriculturalFieldRequest agriculturalFieldRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(agriculturalFieldService.createField(agriculturalFieldRequest));
    }
    @GetMapping("/{fieldId}")
    public ResponseEntity<AgriculturalField> findById(@PathVariable("fieldId") Integer id){
        return ResponseEntity.ok(agriculturalFieldService.selectFieldById(id));
    }
    @GetMapping
    public ResponseEntity<List<AgriculturalField>> findAll(){
        return ResponseEntity.ok(agriculturalFieldService.selectAllFields());
    }
    @PutMapping("/{fieldId}")
    public ResponseEntity<AgriculturalField> update(@PathVariable("fieldId") Integer id, @RequestBody AgriculturalFieldRequest agriculturalFieldRequest){
        return ResponseEntity.ok(agriculturalFieldService.updateField(id, agriculturalFieldRequest));
    }
    @DeleteMapping("{fieldId}")
    public ResponseEntity<Void> delete(@PathVariable("fieldId") Integer id){
        agriculturalFieldService.deleteField(id);
        return ResponseEntity.noContent().build();
    }
}
