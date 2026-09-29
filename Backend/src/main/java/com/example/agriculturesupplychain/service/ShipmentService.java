package com.example.agriculturesupplychain.service;

import com.example.agriculturesupplychain.dto.ShipmentRequest;
import com.example.agriculturesupplychain.entity.Buyer;
import com.example.agriculturesupplychain.entity.CropBatch;
import com.example.agriculturesupplychain.entity.Shipment;
import com.example.agriculturesupplychain.exception.ResourceNotFoundException;
import com.example.agriculturesupplychain.repository.BuyerRepository;
import com.example.agriculturesupplychain.repository.CropBatchRepository;
import com.example.agriculturesupplychain.repository.ShipmentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShipmentService {
    private final ShipmentRepository shipmentRepository;
    private final CropBatchRepository cropBatchRepository;
    private final BuyerRepository buyerRepository;
    private static final Logger logger = LoggerFactory.getLogger(ShipmentService.class);
    public ShipmentService(ShipmentRepository shipmentRepository, CropBatchRepository cropBatchRepository, BuyerRepository buyerRepository){
        this.shipmentRepository = shipmentRepository;
        this.buyerRepository = buyerRepository;
        this.cropBatchRepository = cropBatchRepository;
    }
    public Shipment createShipment(ShipmentRequest shipmentRequest){
        CropBatch cropBatch = cropBatchRepository.findById(shipmentRequest.getBatchNo())
                .orElseThrow(() -> new ResourceNotFoundException("crop batch with batch no " + shipmentRequest.getBatchNo() + " not found"));
        Buyer buyer = buyerRepository.findById(shipmentRequest.getBuyerId())
                .orElseThrow(() -> new ResourceNotFoundException("Buyer with id " + shipmentRequest.getBuyerId() + " not found"));
        Shipment shipment = new Shipment();
        shipment.setShipmentId(shipmentRequest.getShipmentId());
        shipment.setDate(shipmentRequest.getDate());
        shipment.setQty(shipmentRequest.getQty());
        shipment.setStatus(shipmentRequest.getStatus());
        shipment.setCropBatch(cropBatch);
        shipment.setBuyer(buyer);
        return shipmentRepository.save(shipment);
    }
    public Shipment selectShipmentById(Integer id){
        return shipmentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Shipment with id " + id + " not found"));
    }
    public List<Shipment> selectAllShipments(){
        return shipmentRepository.findAll();
    }
    public Shipment updateShipment(Integer id, ShipmentRequest shipmentRequest){
        Shipment shipment = shipmentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Shipment with id " + id + " not found"));
        CropBatch cropBatch = cropBatchRepository.findById(shipmentRequest.getBatchNo())
                .orElseThrow(() -> new ResourceNotFoundException("crop batch with batch no " + shipmentRequest.getBatchNo() + " not found"));
        Buyer buyer = buyerRepository.findById(shipmentRequest.getBuyerId())
                .orElseThrow(() -> new ResourceNotFoundException("Buyer with id " + shipmentRequest.getBuyerId() + " not found"));
        shipment.setQty(shipmentRequest.getQty());
        shipment.setDate(shipmentRequest.getDate());
        shipment.setStatus(shipmentRequest.getStatus());
        shipment.setCropBatch(cropBatch);
        shipment.setBuyer(buyer);
        return shipmentRepository.save(shipment);
    }
    public void deleteShipment(Integer id){
        Shipment shipment = shipmentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Shipment with id " + id + " not found"));
        shipmentRepository.delete(shipment);
        logger.info("Deleted Shipment with id {}", id);
    }
}
