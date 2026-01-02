/**
 * Fuzzy search implementation
 * Matches pattern against text with scoring
 */
export const fuzzySearch = (pattern, text) => {
  if (!pattern) return { match: true, score: 1 };
  
  // Ensure both pattern and text are strings
  if (typeof pattern !== 'string') pattern = String(pattern || '');
  if (typeof text !== 'string') text = String(text || '');
  
  pattern = pattern.toLowerCase();
  text = text.toLowerCase();
  
  let patternIdx = 0;
  let score = 0;
  let consecutiveMatches = 0;
  
  for (let i = 0; i < text.length; i++) {
    if (text[i] === pattern[patternIdx]) {
      score += 1 + consecutiveMatches;
      consecutiveMatches++;
      patternIdx++;
      
      if (patternIdx === pattern.length) {
        return { match: true, score };
      }
    } else {
      consecutiveMatches = 0;
    }
  }
  
  return { match: patternIdx === pattern.length, score };
};

/**
 * Filter and rank items based on search query
 */
export const fuzzyFilter = (items, query, keys = ['label', 'description']) => {
  if (!query.trim()) {
    return items.map(item => ({ item, score: 0 }));
  }
  
  const results = items
    .map(item => {
      let bestScore = -1;
      let matched = false;
      
      for (const key of keys) {
        const value = item[key];
        if (!value) continue;
        
        const { match, score } = fuzzySearch(query, value);
        if (match) {
          matched = true;
          bestScore = Math.max(bestScore, score);
        }
      }
      
      return { item, score: bestScore, matched };
    })
    .filter(result => result.matched)
    .sort((a, b) => b.score - a.score);
  
  return results;
};

/**
 * Highlight matching characters in text
 */
export const highlightMatches = (text, query) => {
  // Ensure text is a string
  if (typeof text !== 'string') text = String(text || '');
  if (!query) return [{ text, highlight: false }];
  
  const result = [];
  let textIdx = 0;
  let queryIdx = 0;
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  
  while (textIdx < text.length) {
    if (queryIdx < lowerQuery.length && lowerText[textIdx] === lowerQuery[queryIdx]) {
      result.push({ text: text[textIdx], highlight: true });
      queryIdx++;
    } else {
      result.push({ text: text[textIdx], highlight: false });
    }
    textIdx++;
  }
  
  return result;
};
