import { Issue } from '../types';
import { ParsedJoke } from '../types';

/**
 * Parses GitHub issue body to extract template fields
 * Supports GitHub issue template format with ### headers
 */
export function ParseIssueBody(Issue: Issue): ParsedJoke {
  const Body = Issue.body || '';
  
  // Helper function to extract field value
  const ExtractField = (Pattern: RegExp, Fallback?: string): string | undefined => {
    const Match = Body.match(Pattern);
    if (!Match) return Fallback;
    
    const Value = Match[1].trim();
    // Filter out empty values and GitHub's "No response" placeholder
    if (!Value || Value === '_No response_' || Value === '') {
      return Fallback;
    }
    return Value;
  };

  // Extract joke text (field id: joke)
  // Pattern: ### 🎤 Your Hilarious Joke\n\n[content]\n\n### or end
  const JokePattern = /###\s*🎤\s*Your Hilarious Joke\s*\n\n([\s\S]*?)(?=\n###|\n---|$)/i;
  const Joke = ExtractField(JokePattern, Body.trim() || Issue.title) || Issue.title;

  // Extract image URL (field id: image)
  // Pattern: ### 🖼️ Meme Image URL\n\n[url]\n\n### or end
  // Also handle cases where there might be extra whitespace or different formatting
  // Try multiple patterns to handle different GitHub issue body formats
  let ImageUrl: string | undefined;
  
  // Pattern 1: Standard format with ### header
  const ImagePattern1 = /###\s*🖼️\s*Meme Image URL\s*\n\n([\s\S]*?)(?=\n###|\n---|$)/i;
  ImageUrl = ExtractField(ImagePattern1);
  
  // Pattern 2: Alternative format (in case GitHub renders it differently)
  if (!ImageUrl) {
    const ImagePattern2 = /🖼️\s*Meme Image URL\s*:?\s*\n\n?([^\n]+)/i;
    ImageUrl = ExtractField(ImagePattern2);
  }
  
  // Pattern 3: Direct URL pattern after the label
  if (!ImageUrl) {
    const ImagePattern3 = /Meme Image URL[:\s]*\n\n?([^\n]+)/i;
    ImageUrl = ExtractField(ImagePattern3);
  }
  
  // Clean up the image URL - remove any extra whitespace, newlines, or markdown links
  if (ImageUrl) {
    ImageUrl = ImageUrl.trim();
    // If it's a markdown link, extract the URL
    const MarkdownLinkMatch = ImageUrl.match(/\[.*?\]\((.*?)\)/);
    if (MarkdownLinkMatch) {
      ImageUrl = MarkdownLinkMatch[1];
    }
    // Remove any trailing whitespace or newlines
    ImageUrl = ImageUrl.replace(/\s+$/, '').replace(/\n/g, '').replace(/\r/g, '');
    
    // Log for debugging (only in development)
    if (process.env.NODE_ENV !== 'production') {
      console.log(`📷 Extracted image URL: ${ImageUrl}`);
    }
  }

  // Extract language (field id: language)
  // Pattern: ### 🌍 Language\n\n[language]\n\n### or end
  const LanguagePattern = /###\s*🌍\s*Language\s*\n\n([\s\S]*?)(?=\n###|\n---|$)/i;
  const Language = ExtractField(LanguagePattern);

  return {
    Joke: Joke || Issue.title,
    Image: ImageUrl,
    Language: Language,
  };
}

