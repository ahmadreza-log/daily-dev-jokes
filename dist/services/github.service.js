"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubService = void 0;
const rest_1 = require("@octokit/rest");
/**
 * GitHub service for interacting with GitHub API
 */
class GitHubService {
    constructor(RepoOwner, RepoName, GitHubToken, Label = 'joke') {
        this.Octokit = new rest_1.Octokit({
            auth: GitHubToken,
        });
        this.RepoOwner = RepoOwner;
        this.RepoName = RepoName;
        this.Label = Label;
    }
    /**
     * Fetches all closed issues with specified label
     */
    async FetchJokeIssues() {
        try {
            console.log(`Fetching closed issues from ${this.RepoOwner}/${this.RepoName} with label "${this.Label}"...`);
            const { data: Issues } = await this.Octokit.rest.issues.listForRepo({
                owner: this.RepoOwner,
                repo: this.RepoName,
                state: 'closed',
                per_page: 100, // GitHub API max is 100 per page
                labels: this.Label, // Filter by label
            });
            // Filter out pull requests (issues only)
            const JokeIssues = Issues.filter(Issue => !Issue.pull_request);
            console.log(`Found ${JokeIssues.length} joke issues`);
            if (JokeIssues.length === 0) {
                throw new Error('No joke issues found! Please create some issues using the joke template.');
            }
            return JokeIssues;
        }
        catch (CaughtError) {
            const ErrorMessage = CaughtError instanceof Error ? CaughtError.message : 'Unknown error';
            console.error('Error fetching issues:', ErrorMessage);
            throw CaughtError;
        }
    }
}
exports.GitHubService = GitHubService;
//# sourceMappingURL=github.service.js.map