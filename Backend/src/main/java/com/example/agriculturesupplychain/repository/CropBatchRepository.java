package com.example.agriculturesupplychain.repository;

import com.example.agriculturesupplychain.entity.CropBatch;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropBatchRepository extends JpaRepository<CropBatch, String> {

    // Search by crop type, quality grade, or storage facility name
    @Query("""
        SELECT cb FROM CropBatch cb
        LEFT JOIN cb.storageFacility sf
        WHERE LOWER(cb.cropType) LIKE LOWER(CONCAT('%', :q, '%'))
           OR LOWER(cb.qualityGrade) LIKE LOWER(CONCAT('%', :q, '%'))
           OR LOWER(sf.storageName) LIKE LOWER(CONCAT('%', :q, '%'))
    """)
    List<CropBatch> searchByText(@Param("q") String q, Pageable pageable);
}
