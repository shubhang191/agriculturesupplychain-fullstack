package com.example.agriculturesupplychain.repository;

import com.example.agriculturesupplychain.entity.StorageFacility;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StorageFacilityRepository extends JpaRepository<StorageFacility, Integer> {

    // Search by storage name, location, or owning coop name
    @Query("""
        SELECT sf FROM StorageFacility sf
        LEFT JOIN sf.regionalCoop rc
        WHERE LOWER(sf.storageName) LIKE LOWER(CONCAT('%', :q, '%'))
           OR LOWER(sf.location) LIKE LOWER(CONCAT('%', :q, '%'))
           OR LOWER(rc.coopName) LIKE LOWER(CONCAT('%', :q, '%'))
    """)
    List<StorageFacility> searchByText(@Param("q") String q, Pageable pageable);
}
