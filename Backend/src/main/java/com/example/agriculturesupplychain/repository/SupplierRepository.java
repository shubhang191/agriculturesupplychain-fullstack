package com.example.agriculturesupplychain.repository;

import com.example.agriculturesupplychain.entity.Supplier;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Integer> {

    // Search by name, type, or location (text columns only)
    @Query("""
        SELECT s FROM Supplier s
        WHERE LOWER(s.supplierName) LIKE LOWER(CONCAT('%', :q, '%'))
           OR LOWER(s.type) LIKE LOWER(CONCAT('%', :q, '%'))
           OR LOWER(s.location) LIKE LOWER(CONCAT('%', :q, '%'))
    """)
    List<Supplier> searchByText(@Param("q") String q, Pageable pageable);
}
