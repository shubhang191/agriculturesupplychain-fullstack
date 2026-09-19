package com.example.agriculturesupplychain.controller;

import com.example.agriculturesupplychain.entity.Buyer;
import com.example.agriculturesupplychain.service.BuyerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buyer")
public class BuyerController {
    private final BuyerService buyerService;
    public BuyerController(BuyerService buyerService){
        this.buyerService = buyerService;
    }
    @PostMapping
    public ResponseEntity<Buyer> create(@RequestBody Buyer buyer){
        return ResponseEntity.status(HttpStatus.CREATED).body(buyerService.createBuyer(buyer));
    }
    @GetMapping("/{buyerId}")
    public ResponseEntity<Buyer> findById(@PathVariable("buyerId") Integer id){
        return ResponseEntity.ok(buyerService.selectBuyerById(id));
    }
    @GetMapping
    public ResponseEntity<List<Buyer>> findAll(){
        return ResponseEntity.ok(buyerService.selectAllBuyers());
    }
    @PutMapping("/{buyerId}")
    public ResponseEntity<Buyer> update(@PathVariable("buyerId") Integer id, @RequestBody Buyer buyer){
        return ResponseEntity.ok(buyerService.updateBuyer(id, buyer));
    }
    @DeleteMapping("/{buyerId}")
    public ResponseEntity<Void> delete(@PathVariable("buyerId") Integer id){
        buyerService.deleteBuyer(id);
        return ResponseEntity.noContent().build();
    }
}
