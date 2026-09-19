package com.example.agriculturesupplychain.service;

import com.example.agriculturesupplychain.entity.Supplier;
import com.example.agriculturesupplychain.exception.ResourceNotFoundException;
import com.example.agriculturesupplychain.repository.SupplierRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierService {
    private final SupplierRepository supplierRepository;
    private static final Logger logger = LoggerFactory.getLogger(SupplierService.class);
    public SupplierService(SupplierRepository supplierRepository){
        this.supplierRepository = supplierRepository;
    }
    public Supplier createSupplier(Supplier supplier){
        return supplierRepository.save(supplier);
    }
    public Supplier selectSupplierById(Integer id){
        return supplierRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Supplier with id: " + id + " not found"));
    }
    public List<Supplier> selectAllSupplier(){
        return supplierRepository.findAll();
    }
    public Supplier updateSupplier(Integer id, Supplier supplier){
        Supplier existing  = supplierRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Supplier with id: " + id + " not found"));
        existing.setSupplierName(supplier.getSupplierName());
        existing.setPhone(supplier.getPhone());
        existing.setType(supplier.getType());
        existing.setLocation(supplier.getLocation());
        return supplierRepository.save(existing);
    }
    public void deleteSupplier(Integer id){
        Supplier supplier  = supplierRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Supplier with id: " + id + " not found"));
        supplierRepository.delete(supplier);
        logger.info("Supplier Deleted with id {}", id);
    }
}
