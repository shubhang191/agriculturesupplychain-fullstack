package com.example.agriculturesupplychain.controller;

import com.example.agriculturesupplychain.service.RegionalCoopService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/regionalCoop")
public class RegionalCoopController {
    private static RegionalCoopService regionalCoopService;
    public RegionalCoopController(RegionalCoopService regionalCoopService){
        this.regionalCoopService = regionalCoopService;
    }
}
