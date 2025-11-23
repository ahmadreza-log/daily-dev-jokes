import { Octokit } from '@octokit/rest';
/**
 * Type definition for GitHub Issue
 */
export type Issue = Awaited<ReturnType<Octokit['rest']['issues']['listForRepo']>>['data'][0];
/**
 * Configuration interface
 */
export interface Config {
    RepoOwner: string;
    RepoName: string;
    GitHubToken: string;
}
/**
 * Parsed joke data from issue template
 */
export interface ParsedJoke {
    Joke: string;
    Image?: string;
    Language?: string;
}
//# sourceMappingURL=index.d.ts.map