package com.example.agriculturesupplychain.service;

import com.example.agriculturesupplychain.entity.RegionalCoop;
import com.example.agriculturesupplychain.exception.ResourceNotFoundException;
import com.example.agriculturesupplychain.repository.RegionalCoopRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegionalCoopService {
    private final RegionalCoopRepository regionalCoopRepository;
    private static final Logger logger = LoggerFactory.getLogger(RegionalCoopService.class);
    public RegionalCoopService(RegionalCoopRepository regionalCoopRepository){
        this.regionalCoopRepository = regionalCoopRepository;
    }
    public RegionalCoop createRegionalCoop(RegionalCoop regionalCoop){
        return regionalCoopRepository.save(regionalCoop);
    }
    public RegionalCoop selectRegionalCoopById(Integer id){
        return regionalCoopRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Regional Coop Not found id: " + id));
    }
    public List<RegionalCoop> selectAllRegionalCoop(){
        return regionalCoopRepository.findAll();
    }
    public RegionalCoop updateRegionalCoop(Integer id, RegionalCoop regionalCoop){
        RegionalCoop existing = regionalCoopRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Regional Coop Not found id: " + id));
        existing.setCoopName(regionalCoop.getCoopName());
        existing.setSiloCapacityTons(regionalCoop.getSiloCapacityTons());
        existing.setState(regionalCoop.getState());
        return regionalCoopRepository.save(existing);
    }
    public void deleteRegionalCoop(Integer id){
        RegionalCoop regionalCoop = regionalCoopRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Regional Coop Not found id: " + id));
        regionalCoopRepository.delete(regionalCoop);
        logger.info("Deleted Regional Coop id {}", id);
    }
}
