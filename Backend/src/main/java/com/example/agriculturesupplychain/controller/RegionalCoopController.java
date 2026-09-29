package com.example.agriculturesupplychain.controller;

import com.example.agriculturesupplychain.entity.RegionalCoop;
import com.example.agriculturesupplychain.service.RegionalCoopService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/regionalCoop")
public class RegionalCoopController {
    private final RegionalCoopService regionalCoopService;
    public RegionalCoopController(RegionalCoopService regionalCoopService){
        this.regionalCoopService = regionalCoopService;
    }
    @PostMapping
    public ResponseEntity<RegionalCoop> create(@RequestBody RegionalCoop regionalCoop){
        return ResponseEntity.status(HttpStatus.CREATED).body(regionalCoopService.createRegionalCoop(regionalCoop));
    }
    @GetMapping("/{coopId}")
    public ResponseEntity<RegionalCoop> findById(@PathVariable("coopId") Integer id){
        return ResponseEntity.ok(regionalCoopService.selectRegionalCoopById(id));
    }
    @GetMapping
    public ResponseEntity<List<RegionalCoop>> findAll(){
        return ResponseEntity.ok(regionalCoopService.selectAllRegionalCoop());
    }
    @PutMapping("/{coopId}")
    public ResponseEntity<RegionalCoop> update(@PathVariable("coopId") Integer id, @RequestBody RegionalCoop regionalCoop){
        return ResponseEntity.ok(regionalCoopService.updateRegionalCoop(id, regionalCoop));
    }
    @DeleteMapping("/{coopId}")
    public ResponseEntity<Void> delete(@PathVariable("coopId") Integer id){
        regionalCoopService.deleteRegionalCoop(id);
        return ResponseEntity.noContent().build();
    }
}
