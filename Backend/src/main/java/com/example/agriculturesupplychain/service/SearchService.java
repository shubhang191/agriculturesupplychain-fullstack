package com.example.agriculturesupplychain.service;

import com.example.agriculturesupplychain.dto.SearchResult;
import com.example.agriculturesupplychain.search.SearchProvider;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Global search service coordinating entity search providers.
 * Parses optional "type:xyz" filter, strips wildcards (% and _),
 * invokes matching providers with limit 5, merges results,
 * and ranks: exact title match > prefix match > contains match.
 */
@Service
public class SearchService {

    private final List<SearchProvider> providers;
    private static final Pattern TYPE_PATTERN = Pattern.compile("(?i)\\btype:(\\w+)\\b");

    public SearchService(List<SearchProvider> providers) {
        this.providers = providers;
    }

    public List<SearchResult> search(String rawInput) {
        if (rawInput == null) {
            return List.of();
        }

        // 1. Strip SQL wildcard characters % and _
        String sanitized = rawInput.replace("%", "").replace("_", "").trim();
        if (sanitized.isEmpty()) {
            return List.of();
        }

        // 2. Extract optional type:xyz token
        String typeFilter = null;
        Matcher matcher = TYPE_PATTERN.matcher(sanitized);
        if (matcher.find()) {
            typeFilter = matcher.group(1).trim().toUpperCase();
            // Remove the type:xyz token from the search query
            sanitized = matcher.replaceAll("").trim();
        }

        // Determine matching providers
        final String targetType = typeFilter;
        List<SearchProvider> targetProviders = providers.stream()
                .filter(p -> targetType == null || p.type().equalsIgnoreCase(targetType))
                .toList();

        // 3. Query matching providers with limit 5
        List<SearchResult> merged = new ArrayList<>();
        for (SearchProvider provider : targetProviders) {
            List<SearchResult> results = provider.search(sanitized, 5);
            merged.addAll(results);
        }

        // 4. Rank results:
        // Rank 1: exact title match (ignoring case)
        // Rank 2: title starts with term (ignoring case)
        // Rank 3: title contains term (ignoring case)
        // Rank 4: subtitle contains or fallback
        final String searchTerm = sanitized.toLowerCase();
        if (!searchTerm.isEmpty()) {
            merged.sort(Comparator.comparingInt(r -> getRankScore(r, searchTerm)));
        }

        return merged;
    }

    private int getRankScore(SearchResult r, String term) {
        String title = r.title() != null ? r.title().toLowerCase() : "";
        if (title.equalsIgnoreCase(term)) {
            return 1;
        }
        if (title.startsWith(term)) {
            return 2;
        }
        if (title.contains(term)) {
            return 3;
        }
        return 4;
    }
}
