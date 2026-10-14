package com.example.agriculturesupplychain.repository;

import com.example.agriculturesupplychain.entity.Shipment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, Integer> {

    // Search by status, crop type, or buyer name
    @Query("""
        SELECT s FROM Shipment s
        LEFT JOIN s.cropBatch cb
        LEFT JOIN s.buyer b
        WHERE LOWER(s.status) LIKE LOWER(CONCAT('%', :q, '%'))
           OR LOWER(cb.cropType) LIKE LOWER(CONCAT('%', :q, '%'))
           OR LOWER(b.buyerName) LIKE LOWER(CONCAT('%', :q, '%'))
    """)
    List<Shipment> searchByText(@Param("q") String q, Pageable pageable);
}
