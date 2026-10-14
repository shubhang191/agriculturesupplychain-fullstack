package com.example.agriculturesupplychain.repository;

import com.example.agriculturesupplychain.entity.Farmer;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FarmerRepository extends JpaRepository<Farmer, Integer> {

    // Search by name, email, location, or related supplier/coop names via LEFT JOIN
    @Query("""
        SELECT f FROM Farmer f
        LEFT JOIN f.supplier sup
        LEFT JOIN f.regionalCoop rc
        WHERE LOWER(f.farmerName) LIKE LOWER(CONCAT('%', :q, '%'))
           OR LOWER(f.email) LIKE LOWER(CONCAT('%', :q, '%'))
           OR LOWER(f.farmLocation) LIKE LOWER(CONCAT('%', :q, '%'))
           OR LOWER(sup.supplierName) LIKE LOWER(CONCAT('%', :q, '%'))
           OR LOWER(rc.coopName) LIKE LOWER(CONCAT('%', :q, '%'))
    """)
    List<Farmer> searchByText(@Param("q") String q, Pageable pageable);
}
