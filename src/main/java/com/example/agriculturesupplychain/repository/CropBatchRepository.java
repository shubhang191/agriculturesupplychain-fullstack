package com.example.agriculturesupplychain.repository;

import com.example.agriculturesupplychain.entity.CropBatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CropBatchRepository extends JpaRepository<CropBatch, String> {
}
