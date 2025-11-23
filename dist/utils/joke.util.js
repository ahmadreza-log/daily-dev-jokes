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
    const IssueNumber = Issue.number;
    const IssueUrl = Issue.html_url;
    // Format joke text with blockquote
    const FormattedJokeText = ParsedJoke.Joke
        .split('\n')
        .map(Line => `> ${Line}`)
        .join('\n');
    // Build the output
    let Output = `${FormattedJokeText}\n>`;
    // Add image if available
    if (ParsedJoke.Image) {
        Output += `\n> \n> ![Joke Image](${ParsedJoke.Image})\n>`;
    }
    // Add language if available
    if (ParsedJoke.Language) {
        Output += `\n> \n> 🌍 ${ParsedJoke.Language}`;
    }
    // Add footer with issue link and author
    Output += `\n> \n> — [Issue #${IssueNumber}](${IssueUrl}) by [@${Author}](https://github.com/${Author})`;
    return Output;
}
//# sourceMappingURL=joke.util.js.map