package com.example.agriculturesupplychain.controller;

import com.example.agriculturesupplychain.entity.Supplier;
import com.example.agriculturesupplychain.service.SupplierService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/supplier")
public class SupplierController {
    private final SupplierService supplierService;
    public SupplierController(SupplierService supplierService){
        this.supplierService = supplierService;
    }
    @PostMapping
    public ResponseEntity<Supplier> create(@RequestBody Supplier supplier){
        return ResponseEntity.status(HttpStatus.CREATED).body(supplierService.createSupplier(supplier));
    }
    @GetMapping("/{supplierId}")
    public ResponseEntity<Supplier> findById(@PathVariable("supplierId") Integer id){
        return ResponseEntity.ok(supplierService.selectSupplierById(id));
    }
    @GetMapping
    public ResponseEntity<List<Supplier>> findAll(){
        return ResponseEntity.ok(supplierService.selectAllSupplier());
    }
    @PutMapping("/{supplierId}")
    public ResponseEntity<Supplier> update(@PathVariable("supplierId") Integer id, @RequestBody Supplier supplier){
        return ResponseEntity.ok(supplierService.updateSupplier(id, supplier));
    }
    @DeleteMapping("/{supplierId}")
    public ResponseEntity<Void> delete(@PathVariable("supplierId") Integer id){
        supplierService.deleteSupplier(id);
        return ResponseEntity.noContent().build();
    }
}
