package com.example.agriculturesupplychain.repository;

import com.example.agriculturesupplychain.entity.StorageFacility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StorageFacilityRepository extends JpaRepository<StorageFacility, Integer> {
}
