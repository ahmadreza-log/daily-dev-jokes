"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectRandomJoke = SelectRandomJoke;
exports.FormatJoke = FormatJoke;
const parser_util_1 = require("./parser.util");
/**
 * Selects a random joke from the list of issues
 */
function SelectRandomJoke(Issues) {
    if (Issues.length === 0) {
        throw new Error('Cannot select from empty issues array');
    }
    const RandomIndex = Math.floor(Math.random() * Issues.length);
    return Issues[RandomIndex];
}
/**
 * Formats the joke for display in README
 */
function FormatJoke(Issue) {
    const ParsedJoke = (0, parser_util_1.ParseIssueBody)(Issue);
    const Author = Issue.user?.login || 'Unknown';
    // Format joke text - keep original line breaks, add blockquote to each line
    // For markdown to properly render line breaks, we need to add a blank line between blockquote lines
    const Lines = ParsedJoke.Joke
        .split('\n')
        .map(Line => Line.trim())
        .filter(Line => Line !== ''); // Remove empty lines first
    // Format with blockquote and add blank lines between for proper markdown rendering
    const FormattedJokeText = Lines
        .map((Line, Index) => {
        // Add a blank blockquote line before each line (except the first) for proper spacing
        if (Index > 0) {
            return `>\n> ${Line}`;
        }
        return `> ${Line}`;
    })
        .join('\n');
    // Build the output
    let Output = `${FormattedJokeText}`;
    // Add image if available (outside blockquote for better rendering)
    if (ParsedJoke.Image && ParsedJoke.Image.trim() !== '') {
        // Validate URL format
        const ImageUrl = ParsedJoke.Image.trim();
        const IsValidUrl = ImageUrl.startsWith('http://') || ImageUrl.startsWith('https://');
        if (IsValidUrl) {
            // Add image outside blockquote for better markdown rendering
            // Use a blank line before and after for proper spacing
            Output += `\n\n![Joke Image](${ImageUrl})\n`;
        }
        else {
            // If it's not a valid URL, log a warning (only in development)
            if (process.env.NODE_ENV !== 'production') {
                console.warn(`⚠️ Invalid image URL format: ${ImageUrl}`);
            }
        }
    }
    // Add footer with author (simple format, no language, no issue link)
    Output += `\n\n> — ${Author}`;
    return Output;
}
//# sourceMappingURL=joke.util.js.map