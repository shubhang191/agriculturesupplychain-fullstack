package com.example.agriculturesupplychain.dto;

/**
 * Unified search result returned by every SearchProvider.
 * - type:     short key like FARMER, BUYER, COOP (frontend maps to display label)
 * - id:       entity primary key as a string
 * - title:    main display text (e.g. entity name)
 * - subtitle: extra context (e.g. location, related entity name)
 */
public record SearchResult(String type, String id, String title, String subtitle) {
}
