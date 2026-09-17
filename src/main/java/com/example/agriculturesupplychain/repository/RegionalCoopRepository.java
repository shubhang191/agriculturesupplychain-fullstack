package com.example.agriculturesupplychain.repository;

import com.example.agriculturesupplychain.entity.RegionalCoop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegionalCoopRepository extends JpaRepository<RegionalCoop, Integer> {
}
