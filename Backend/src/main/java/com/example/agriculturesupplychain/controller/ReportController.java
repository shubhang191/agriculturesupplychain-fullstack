package com.example.agriculturesupplychain.controller;

import com.example.agriculturesupplychain.dto.*;
import com.example.agriculturesupplychain.service.ReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/shipment-details")
    public ResponseEntity<List<ShipmentDetailsReportDTO>> shipmentDetails() {
        return ResponseEntity.ok(reportService.getShipmentDetails());
    }

    @GetMapping("/farmer-network")
    public ResponseEntity<List<FarmerNetworkReportDTO>> farmerNetwork() {
        return ResponseEntity.ok(reportService.getFarmerNetwork());
    }

    @GetMapping("/batch-storage")
    public ResponseEntity<List<BatchStorageReportDTO>> batchStorage() {
        return ResponseEntity.ok(reportService.getBatchStorage());
    }

    @GetMapping("/buyer-shipments")
    public ResponseEntity<List<BuyerShipmentsReportDTO>> buyerShipments() {
        return ResponseEntity.ok(reportService.getBuyerShipments());
    }

    @GetMapping("/buyer-tonnage")
    public ResponseEntity<List<BuyerTonnageReportDTO>> buyerTonnage() {
        return ResponseEntity.ok(reportService.getBuyerTonnage());
    }
}
