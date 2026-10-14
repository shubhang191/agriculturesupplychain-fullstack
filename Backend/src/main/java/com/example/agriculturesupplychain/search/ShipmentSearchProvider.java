package com.example.agriculturesupplychain.search;

import com.example.agriculturesupplychain.dto.SearchResult;
import com.example.agriculturesupplychain.repository.ShipmentRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ShipmentSearchProvider implements SearchProvider {

    private final ShipmentRepository repo;

    public ShipmentSearchProvider(ShipmentRepository repo) {
        this.repo = repo;
    }

    @Override
    public String type() { return "SHIPMENT"; }

    @Override
    public List<SearchResult> search(String term, int limit) {
        return repo.searchByText(term, PageRequest.of(0, limit)).stream()
                .map(s -> new SearchResult(
                        type(),
                        String.valueOf(s.getShipmentId()),
                        "Shipment #" + s.getShipmentId(),
                        (s.getStatus() != null ? s.getStatus() : "")
                            + (s.getBuyer() != null ? " → " + s.getBuyer().getBuyerName() : "")))
                .toList();
    }
}
