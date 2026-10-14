package com.example.agriculturesupplychain.repository;

import com.example.agriculturesupplychain.dto.*;
import com.example.agriculturesupplychain.entity.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Report-only repository. Uses Shipment as the managed entity type
 * (JpaRepository requires one), but all methods return DTO projections.
 */
@Repository
public interface ReportRepository extends JpaRepository<Shipment, Integer> {

    // (a) Shipment details: shipment ⟶ cropBatch ⟶ buyer (inner joins via entity relations)
    @Query("""
        SELECT new com.example.agriculturesupplychain.dto.ShipmentDetailsReportDTO(
            s.shipmentId, s.date, s.qty, s.status,
            cb.batchNo, cb.cropType, cb.qualityGrade, cb.pricePerTon,
            b.buyerId, b.buyerName, b.buyerType, b.location)
        FROM Shipment s
        JOIN s.cropBatch cb
        JOIN s.buyer b
        ORDER BY s.shipmentId
    """)
    List<ShipmentDetailsReportDTO> getShipmentDetailsReport();

    // (b) Farmer network: farmer ⟶ supplier, farmer ⟶ regionalCoop
    @Query("""
        SELECT new com.example.agriculturesupplychain.dto.FarmerNetworkReportDTO(
            f.farmerId, f.farmerName, f.email, f.phone, f.farmLocation,
            sup.supplierId, sup.supplierName, sup.type, sup.location,
            rc.coopId, rc.coopName, rc.state)
        FROM Farmer f
        JOIN f.supplier sup
        JOIN f.regionalCoop rc
        ORDER BY f.farmerId
    """)
    List<FarmerNetworkReportDTO> getFarmerNetworkReport();

    // (c) Batch storage: cropBatch ⟶ storageFacility ⟶ regionalCoop
    @Query("""
        SELECT new com.example.agriculturesupplychain.dto.BatchStorageReportDTO(
            cb.batchNo, cb.cropType, cb.qualityGrade, cb.pricePerTon, cb.harvestDate,
            sf.storageId, sf.storageName, sf.location, sf.capacityTons,
            rc.coopId, rc.coopName, rc.state)
        FROM CropBatch cb
        JOIN cb.storageFacility sf
        JOIN sf.regionalCoop rc
        ORDER BY cb.batchNo
    """)
    List<BatchStorageReportDTO> getBatchStorageReport();

    // (d) LEFT JOIN: all buyers with their shipments (buyers with no shipments still appear)
    @Query("""
        SELECT new com.example.agriculturesupplychain.dto.BuyerShipmentsReportDTO(
            b.buyerId, b.buyerName, b.buyerType, b.location,
            s.shipmentId, s.date, s.qty, s.status)
        FROM Buyer b
        LEFT JOIN Shipment s ON s.buyer = b
        ORDER BY b.buyerId, s.shipmentId
    """)
    List<BuyerShipmentsReportDTO> getBuyerShipmentsReport();

    // (e) GROUP BY: total tons shipped per buyer, ordered highest first
    @Query("""
        SELECT new com.example.agriculturesupplychain.dto.BuyerTonnageReportDTO(
            b.buyerId, b.buyerName, b.buyerType, b.location,
            COALESCE(SUM(s.qty), 0), COUNT(s.shipmentId))
        FROM Buyer b
        LEFT JOIN Shipment s ON s.buyer = b
        GROUP BY b.buyerId, b.buyerName, b.buyerType, b.location
        ORDER BY COALESCE(SUM(s.qty), 0) DESC
    """)
    List<BuyerTonnageReportDTO> getBuyerTonnageReport();
}
