package com.example.agriculturesupplychain.repository;

import com.example.agriculturesupplychain.entity.AgriculturalField;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgriculturalFieldRepository extends JpaRepository<AgriculturalField, Integer> {

    // Search by field name, crop type, or owner farmer name
    @Query("""
        SELECT af FROM AgriculturalField af
        LEFT JOIN af.farmer f
        WHERE LOWER(af.fieldName) LIKE LOWER(CONCAT('%', :q, '%'))
           OR LOWER(af.cropType) LIKE LOWER(CONCAT('%', :q, '%'))
           OR LOWER(f.farmerName) LIKE LOWER(CONCAT('%', :q, '%'))
    """)
    List<AgriculturalField> searchByText(@Param("q") String q, Pageable pageable);
}
