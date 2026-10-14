package com.example.agriculturesupplychain.search;

import com.example.agriculturesupplychain.dto.SearchResult;
import com.example.agriculturesupplychain.repository.FarmerRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FarmerSearchProvider implements SearchProvider {

    private final FarmerRepository repo;

    public FarmerSearchProvider(FarmerRepository repo) {
        this.repo = repo;
    }

    @Override
    public String type() { return "FARMER"; }

    @Override
    public List<SearchResult> search(String term, int limit) {
        return repo.searchByText(term, PageRequest.of(0, limit)).stream()
                .map(f -> new SearchResult(
                        type(),
                        String.valueOf(f.getFarmerId()),
                        f.getFarmerName(),
                        f.getFarmLocation() != null ? f.getFarmLocation() : ""))
                .toList();
    }
}
