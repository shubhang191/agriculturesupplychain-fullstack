package com.example.agriculturesupplychain.service;

import com.example.agriculturesupplychain.entity.Buyer;
import com.example.agriculturesupplychain.exception.ResourceNotFoundException;
import com.example.agriculturesupplychain.repository.BuyerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BuyerService {
    private final BuyerRepository buyerRepository;
    private static final Logger logger = LoggerFactory.getLogger(BuyerService.class);
    public BuyerService(BuyerRepository buyerRepository){
        this.buyerRepository = buyerRepository;
    }
    public Buyer createBuyer(Buyer buyer){
        return buyerRepository.save(buyer);
    }
    public Buyer selectBuyerById(Integer id){
        return buyerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Buyer with id " + id + " not found"));
    }
    public List<Buyer> selectAllBuyers(){
        return buyerRepository.findAll();
    }
    public Buyer updateBuyer(Integer id, Buyer buyer){
        Buyer existing = buyerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Buyer with id " + id + " not found"));
        existing.setBuyerName(buyer.getBuyerName());
        existing.setBuyerType(buyer.getBuyerType());
        existing.setPhone(buyer.getPhone());
        existing.setLocation(buyer.getLocation());
        return buyerRepository.save(existing);
    }
    public void deleteBuyer(Integer id){
        Buyer buyer = buyerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Buyer with id " + id + " not found"));
        buyerRepository.delete(buyer);
        logger.info("Deleted Buyer with id {}", id);
    }
}
