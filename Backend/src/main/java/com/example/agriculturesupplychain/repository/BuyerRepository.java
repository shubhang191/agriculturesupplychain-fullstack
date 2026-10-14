package com.example.agriculturesupplychain.repository;

import com.example.agriculturesupplychain.entity.Buyer;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BuyerRepository extends JpaRepository<Buyer, Integer> {

    // Search by buyer name, type, or location (text columns only)
    @Query("""
        SELECT b FROM Buyer b
        WHERE LOWER(b.buyerName) LIKE LOWER(CONCAT('%', :q, '%'))
           OR LOWER(b.buyerType) LIKE LOWER(CONCAT('%', :q, '%'))
           OR LOWER(b.location) LIKE LOWER(CONCAT('%', :q, '%'))
    """)
    List<Buyer> searchByText(@Param("q") String q, Pageable pageable);
}
