package com.example.agriculturesupplychain.repository;

import com.example.agriculturesupplychain.entity.RegionalCoop;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegionalCoopRepository extends JpaRepository<RegionalCoop, Integer> {

    // Search by name or state (text columns only)
    @Query("""
        SELECT rc FROM RegionalCoop rc
        WHERE LOWER(rc.coopName) LIKE LOWER(CONCAT('%', :q, '%'))
           OR LOWER(rc.state) LIKE LOWER(CONCAT('%', :q, '%'))
    """)
    List<RegionalCoop> searchByText(@Param("q") String q, Pageable pageable);
}
