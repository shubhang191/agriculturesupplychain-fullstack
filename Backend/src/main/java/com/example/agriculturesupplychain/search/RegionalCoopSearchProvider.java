package com.example.agriculturesupplychain.search;

import com.example.agriculturesupplychain.dto.SearchResult;
import com.example.agriculturesupplychain.repository.RegionalCoopRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RegionalCoopSearchProvider implements SearchProvider {

    private final RegionalCoopRepository repo;

    public RegionalCoopSearchProvider(RegionalCoopRepository repo) {
        this.repo = repo;
    }

    @Override
    public String type() { return "COOP"; }

    @Override
    public List<SearchResult> search(String term, int limit) {
        return repo.searchByText(term, PageRequest.of(0, limit)).stream()
                .map(rc -> new SearchResult(
                        type(),
                        String.valueOf(rc.getCoopId()),
                        rc.getCoopName(),
                        rc.getState() != null ? rc.getState() : ""))
                .toList();
    }
}
