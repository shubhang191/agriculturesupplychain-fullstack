package com.example.agriculturesupplychain.repository;

import com.example.agriculturesupplychain.entity.AgriculturalField;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgriculturalFieldRepository extends JpaRepository<AgriculturalField, Integer> {
}
