import { Issue } from '../types';
/**
 * GitHub service for interacting with GitHub API
 */
export declare class GitHubService {
    private Octokit;
    private RepoOwner;
    private RepoName;
    private Label;
    constructor(RepoOwner: string, RepoName: string, GitHubToken: string, Label?: string);
    /**
     * Fetches all closed issues with specified label
     */
    FetchJokeIssues(): Promise<Issue[]>;
}
//# sourceMappingURL=github.service.d.ts.map