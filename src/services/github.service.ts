import { Octokit } from '@octokit/rest';
import { Issue } from '../types';

/**
 * GitHub service for interacting with GitHub API
 */
export class GitHubService {
  private Octokit: Octokit;
  private RepoOwner: string;
  private RepoName: string;
  private Label: string;

  constructor(RepoOwner: string, RepoName: string, GitHubToken: string, Label: string = 'joke') {
    this.Octokit = new Octokit({
      auth: GitHubToken,
    });
    this.RepoOwner = RepoOwner;
    this.RepoName = RepoName;
    this.Label = Label;
  }

  /**
   * Fetches all closed issues with specified label
   */
  async FetchJokeIssues(): Promise<Issue[]> {
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
    } catch (CaughtError) {
      const ErrorMessage = CaughtError instanceof Error ? CaughtError.message : 'Unknown error';
      console.error('Error fetching issues:', ErrorMessage);
      throw CaughtError;
    }
  }
}

