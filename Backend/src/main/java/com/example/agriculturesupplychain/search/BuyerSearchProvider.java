package com.example.agriculturesupplychain.search;

import com.example.agriculturesupplychain.dto.SearchResult;
import com.example.agriculturesupplychain.repository.BuyerRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BuyerSearchProvider implements SearchProvider {

    private final BuyerRepository repo;

    public BuyerSearchProvider(BuyerRepository repo) {
        this.repo = repo;
    }

    @Override
    public String type() { return "BUYER"; }

    @Override
    public List<SearchResult> search(String term, int limit) {
        return repo.searchByText(term, PageRequest.of(0, limit)).stream()
                .map(b -> new SearchResult(
                        type(),
                        String.valueOf(b.getBuyerId()),
                        b.getBuyerName(),
                        b.getLocation() != null ? b.getLocation() : ""))
                .toList();
    }
}
