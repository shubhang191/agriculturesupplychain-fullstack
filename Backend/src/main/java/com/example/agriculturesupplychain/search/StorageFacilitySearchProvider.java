package com.example.agriculturesupplychain.search;

import com.example.agriculturesupplychain.dto.SearchResult;
import com.example.agriculturesupplychain.repository.StorageFacilityRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class StorageFacilitySearchProvider implements SearchProvider {

    private final StorageFacilityRepository repo;

    public StorageFacilitySearchProvider(StorageFacilityRepository repo) {
        this.repo = repo;
    }

    @Override
    public String type() { return "STORAGE"; }

    @Override
    public List<SearchResult> search(String term, int limit) {
        return repo.searchByText(term, PageRequest.of(0, limit)).stream()
                .map(sf -> new SearchResult(
                        type(),
                        String.valueOf(sf.getStorageId()),
                        sf.getStorageName(),
                        sf.getLocation() != null ? sf.getLocation() : ""))
                .toList();
    }
}
