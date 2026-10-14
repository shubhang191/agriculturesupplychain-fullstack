package com.example.agriculturesupplychain.controller;

import com.example.agriculturesupplychain.dto.SearchResult;
import com.example.agriculturesupplychain.service.SearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    public ResponseEntity<List<SearchResult>> search(@RequestParam(value = "q", required = false, defaultValue = "") String query) {
        return ResponseEntity.ok(searchService.search(query));
    }
}
