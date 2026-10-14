package com.example.agriculturesupplychain.search;

import com.example.agriculturesupplychain.dto.SearchResult;

import java.util.List;

/**
 * Each entity type implements this to provide search results.
 * type() returns a short uppercase key (e.g. FARMER, BUYER, COOP).
 */
public interface SearchProvider {
    String type();
    List<SearchResult> search(String term, int limit);
}
