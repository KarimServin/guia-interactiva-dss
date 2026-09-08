/**
 * Shared utility functions for the DSS Guía Interactiva.
 * Centralizes common helpers to avoid code duplication across components.
 */

/**
 * Normalizes a string by removing diacritics (accent marks) and converting to lowercase.
 * Used for accent-insensitive search comparisons across the app.
 */
export const normalizeStr = (str: string): string =>
  str ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : '';

/**
 * Returns true if ALL search terms are found within the given text.
 * Supports multi-word queries where each word must appear somewhere in the text.
 */
export const matchesAllTerms = (text: string, terms: string[]): boolean => {
  if (!text || terms.length === 0) return false;
  const normalized = normalizeStr(text);
  return terms.every(term => normalized.includes(term));
};

/**
 * Parses a search query string into individual normalized search terms.
 */
export const parseSearchTerms = (query: string): string[] =>
  normalizeStr(query).split(/\s+/).filter(Boolean);

/**
 * Clamps a value between a minimum and maximum.
 */
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);
