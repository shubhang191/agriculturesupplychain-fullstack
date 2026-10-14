package com.example.agriculturesupplychain.search;

import com.example.agriculturesupplychain.dto.SearchResult;
import com.example.agriculturesupplychain.repository.SupplierRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SupplierSearchProvider implements SearchProvider {

    private final SupplierRepository repo;

    public SupplierSearchProvider(SupplierRepository repo) {
        this.repo = repo;
    }

    @Override
    public String type() { return "SUPPLIER"; }

    @Override
    public List<SearchResult> search(String term, int limit) {
        return repo.searchByText(term, PageRequest.of(0, limit)).stream()
                .map(s -> new SearchResult(
                        type(),
                        String.valueOf(s.getSupplierId()),
                        s.getSupplierName(),
                        s.getLocation() != null ? s.getLocation() : ""))
                .toList();
    }
}
