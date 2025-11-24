import { Octokit } from '@octokit/rest';
import * as core from '@actions/core';
import * as github from '@actions/github';

/**
 * Renumbers all issues with 'joke' label to "Joke #1", "Joke #2", etc.
 */
async function RenumberIssues(): Promise<void> {
  try {
    // Try to get token from environment (GitHub Actions) or input
    let GitHubToken = process.env.GITHUB_TOKEN || '';
    
    // If running in GitHub Actions, try to get from core
    try {
      if (!GitHubToken && typeof core.getInput === 'function') {
        GitHubToken = core.getInput('GITHUB_TOKEN') || '';
      }
    } catch {
      // core.getInput might not be available in all contexts
    }
    
    const Label = (typeof core.getInput === 'function' ? core.getInput('LABEL') : null) || 'joke';

    if (!GitHubToken) {
      throw new Error('GITHUB_TOKEN is required! Please set it as an environment variable or GitHub Actions secret.');
    }

    const OctokitInstance = new Octokit({ auth: GitHubToken });
    
    // Get repo info from GitHub context or environment variables
    let RepoOwner: string;
    let RepoName: string;
    
    try {
      if (github.context && github.context.repo) {
        RepoOwner = github.context.repo.owner;
        RepoName = github.context.repo.repo;
      } else {
        throw new Error('GitHub context not available');
      }
    } catch {
      // Fallback to environment variables
      const RepoString = process.env.GITHUB_REPOSITORY || '';
      if (!RepoString) {
        throw new Error('GITHUB_REPOSITORY environment variable is required!');
      }
      const [Owner, Repo] = RepoString.split('/');
      RepoOwner = Owner;
      RepoName = Repo;
    }

    const LogInfo = (message: string) => {
      if (typeof core.info === 'function') {
        core.info(message);
      } else {
        console.log(message);
      }
    };

    LogInfo(`🔍 Fetching all issues with label "${Label}" from ${RepoOwner}/${RepoName}...`);

    // Fetch all issues (both open and closed) with the 'joke' label
    const AllIssues: any[] = [];
    let Page = 1;
    let HasMore = true;

    while (HasMore) {
      const { data: Issues } = await OctokitInstance.rest.issues.listForRepo({
        owner: RepoOwner,
        repo: RepoName,
        state: 'all', // Get both open and closed issues
        per_page: 100,
        page: Page,
        labels: Label,
      });

      // Filter out pull requests (issues only)
      const IssuesOnly = Issues.filter(Issue => !Issue.pull_request);
      AllIssues.push(...IssuesOnly);

      // Check if there are more pages
      HasMore = Issues.length === 100;
      Page++;
    }

    LogInfo(`📋 Found ${AllIssues.length} issues with label "${Label}"`);

    if (AllIssues.length === 0) {
      LogInfo('ℹ️ No issues found. Nothing to renumber.');
      return;
    }

    // Sort issues by creation date (oldest first) to maintain consistent numbering
    AllIssues.sort((a, b) => {
      const DateA = new Date(a.created_at).getTime();
      const DateB = new Date(b.created_at).getTime();
      return DateA - DateB;
    });

    LogInfo(`🔄 Renumbering ${AllIssues.length} issues...`);

    // Renumber all issues
    for (let Index = 0; Index < AllIssues.length; Index++) {
      const Issue = AllIssues[Index];
      const NewTitle = `Joke #${Index + 1}`;
      const IssueNumber = Issue.number;

      // Skip if title is already correct
      if (Issue.title === NewTitle) {
        LogInfo(`✅ Issue #${IssueNumber} already has correct title: "${NewTitle}"`);
        continue;
      }

      try {
        await OctokitInstance.rest.issues.update({
          owner: RepoOwner,
          repo: RepoName,
          issue_number: IssueNumber,
          title: NewTitle,
        });

        LogInfo(`✨ Updated issue #${IssueNumber}: "${Issue.title}" → "${NewTitle}"`);
      } catch (UpdateError) {
        const ErrorMessage = UpdateError instanceof Error ? UpdateError.message : 'Unknown error';
        const LogWarning = (message: string) => {
          if (typeof core.warning === 'function') {
            core.warning(message);
          } else {
            console.warn(message);
          }
        };
        LogWarning(`⚠️ Failed to update issue #${IssueNumber}: ${ErrorMessage}`);
      }
    }

    LogInfo('✅ Renumbering completed!');
  } catch (CaughtError) {
    const ErrorMessage = CaughtError instanceof Error ? CaughtError.message : 'Unknown error';
    if (typeof core.setFailed === 'function') {
      core.setFailed(`❌ Error: ${ErrorMessage}`);
    } else {
      console.error(`❌ Error: ${ErrorMessage}`);
    }
    throw CaughtError;
  }
}

// Run the script
if (require.main === module) {
  RenumberIssues();
}

export { RenumberIssues };

