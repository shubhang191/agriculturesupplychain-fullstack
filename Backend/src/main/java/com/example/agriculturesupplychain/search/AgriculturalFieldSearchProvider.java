package com.example.agriculturesupplychain.search;

import com.example.agriculturesupplychain.dto.SearchResult;
import com.example.agriculturesupplychain.repository.AgriculturalFieldRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AgriculturalFieldSearchProvider implements SearchProvider {

    private final AgriculturalFieldRepository repo;

    public AgriculturalFieldSearchProvider(AgriculturalFieldRepository repo) {
        this.repo = repo;
    }

    @Override
    public String type() { return "FIELD"; }

    @Override
    public List<SearchResult> search(String term, int limit) {
        return repo.searchByText(term, PageRequest.of(0, limit)).stream()
                .map(af -> new SearchResult(
                        type(),
                        String.valueOf(af.getFieldId()),
                        af.getFieldName() != null ? af.getFieldName() : "Field #" + af.getFieldId(),
                        af.getCropType() != null ? af.getCropType() : ""))
                .toList();
    }
}
