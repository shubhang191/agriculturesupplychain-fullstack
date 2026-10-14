package com.example.agriculturesupplychain.search;

import com.example.agriculturesupplychain.dto.SearchResult;
import com.example.agriculturesupplychain.repository.CropBatchRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CropBatchSearchProvider implements SearchProvider {

    private final CropBatchRepository repo;

    public CropBatchSearchProvider(CropBatchRepository repo) {
        this.repo = repo;
    }

    @Override
    public String type() { return "BATCH"; }

    @Override
    public List<SearchResult> search(String term, int limit) {
        return repo.searchByText(term, PageRequest.of(0, limit)).stream()
                .map(cb -> new SearchResult(
                        type(),
                        cb.getBatchNo(),
                        cb.getBatchNo() + " — " + cb.getCropType(),
                        cb.getQualityGrade() != null ? "Grade: " + cb.getQualityGrade() : ""))
                .toList();
    }
}
