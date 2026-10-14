package com.example.agriculturesupplychain.service;

import com.example.agriculturesupplychain.dto.*;
import com.example.agriculturesupplychain.repository.ReportRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service layer for report queries. Delegates directly to the ReportRepository.
 */
@Service
public class ReportService {

    private final ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    public List<ShipmentDetailsReportDTO> getShipmentDetails() {
        return reportRepository.getShipmentDetailsReport();
    }

    public List<FarmerNetworkReportDTO> getFarmerNetwork() {
        return reportRepository.getFarmerNetworkReport();
    }

    public List<BatchStorageReportDTO> getBatchStorage() {
        return reportRepository.getBatchStorageReport();
    }

    public List<BuyerShipmentsReportDTO> getBuyerShipments() {
        return reportRepository.getBuyerShipmentsReport();
    }

    public List<BuyerTonnageReportDTO> getBuyerTonnage() {
        return reportRepository.getBuyerTonnageReport();
    }
}
