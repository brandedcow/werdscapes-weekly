import { OcrSpaceResponse } from "ocr-space-api-wrapper";

export type ParseOCRTokenResult = {
  [playerName: string]: string;
};

export function parseOCRTokens(
  ocrResult: OcrSpaceResponse
): ParseOCRTokenResult {
  if (!ocrResult || !ocrResult.ParsedResults || ocrResult.ParsedResults.length === 0) {
    return {};
  }

  const rawText = ocrResult.ParsedResults[0].ParsedText;
  // Split by tabs and newlines
  const tokens = rawText.split(/[\t\r\n]+/)
    .map(t => t.trim())
    .filter(t => t !== "" && t !== "0");

  const results: ParseOCRTokenResult = {};
  
  // Strategy: Find tokens that look like scores (numbers with optional commas)
  // and pair them with the most likely name token before them.
  // Usually the format is [Name, Junk/Rank, Score] or [Name, Score].
  
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const cleanScore = token.replace(/,/g, "");
    
    // Check if it's a number (the score)
    if (/^\d+$/.test(cleanScore) && cleanScore.length >= 1) {
      // Look back for a name. A name is usually non-numeric.
      // We look at the immediate predecessor first.
      let name = "";
      if (i > 0) {
        // If the predecessor is not a number, it's likely the name.
        if (!/^\d+$/.test(tokens[i-1].replace(/,/g, ""))) {
          name = tokens[i-1];
        } else if (i > 1 && !/^\d+$/.test(tokens[i-2].replace(/,/g, ""))) {
          // If the predecessor is a number (maybe a rank or mid-score), check one further back.
          name = tokens[i-2];
        }
      }
      
      if (name && name.length > 1) {
        // Only update if it's a higher score or first time seeing name
        const currentScore = parseInt(results[name] || "0");
        const newScore = parseInt(cleanScore);
        if (newScore > currentScore) {
          results[name] = cleanScore;
        }
      }
    }
  }

  return results;
}
