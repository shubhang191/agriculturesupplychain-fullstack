package com.example.agriculturesupplychain.controller;

import com.example.agriculturesupplychain.dto.ShipmentRequest;
import com.example.agriculturesupplychain.entity.Shipment;
import com.example.agriculturesupplychain.service.ShipmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shipment")
public class ShipmentController {
    private final ShipmentService shipmentService;
    public ShipmentController(ShipmentService shipmentService){
        this.shipmentService = shipmentService;
    }
    @PostMapping
    public ResponseEntity<Shipment> create(@RequestBody ShipmentRequest shipmentRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(shipmentService.createShipment(shipmentRequest));
    }
    @GetMapping("/{shipmentId}")
    public ResponseEntity<Shipment> findById(@PathVariable("shipmentId") Integer id){
        return ResponseEntity.ok(shipmentService.selectShipmentById(id));
    }
    @GetMapping
    public ResponseEntity<List<Shipment>> findAll(){
        return ResponseEntity.ok(shipmentService.selectAllShipments());
    }
    @PutMapping("/{shipmentId}")
    public ResponseEntity<Shipment> update(@PathVariable("shipmentId") Integer id, @RequestBody ShipmentRequest shipmentRequest){
        return ResponseEntity.ok(shipmentService.updateShipment(id, shipmentRequest));
    }
    @DeleteMapping("/{shipmentId")
    public ResponseEntity<Void> delete(@PathVariable("shipmentId") Integer id){
        shipmentService.deleteShipment(id);
        return ResponseEntity.noContent().build();
    }
}
