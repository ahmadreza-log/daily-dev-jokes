"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseIssueBody = ParseIssueBody;
/**
 * Parses GitHub issue body to extract template fields
 * Supports GitHub issue template format with ### headers
 */
function ParseIssueBody(Issue) {
    const Body = Issue.body || '';
    // Helper function to extract field value
    const ExtractField = (Pattern, Fallback) => {
        const Match = Body.match(Pattern);
        if (!Match)
            return Fallback;
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
    const ImagePattern = /###\s*🖼️\s*Meme Image URL\s*\n\n([\s\S]*?)(?=\n###|\n---|$)/i;
    const ImageUrl = ExtractField(ImagePattern);
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
//# sourceMappingURL=parser.util.js.map