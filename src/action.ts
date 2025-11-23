import * as core from '@actions/core';
import * as github from '@actions/github';
import * as exec from '@actions/exec';
import { GetConfig } from './config';
import { GitHubService } from './services/github.service';
import { SelectRandomJoke, FormatJoke } from './utils/joke.util';
import { UpdateReadme } from './utils/readme.util';

/**
 * Main action function
 */
async function Run(): Promise<void> {
  try {
    core.info('🚀 Starting daily joke update...\n');

    // Get inputs
    const GitHubToken = core.getInput('GITHUB_TOKEN') || process.env.GITHUB_TOKEN || '';
    const CommitByMe = core.getInput('COMMIT_BY_ME') === 'True';
    const CommitMessage = core.getInput('COMMIT_MESSAGE') || '🤣 Update daily joke [skip ci]';
    const CommitUsername = core.getInput('COMMIT_USERNAME') || 'github-actions[bot]';
    const CommitEmail = core.getInput('COMMIT_EMAIL') || 'github-actions[bot]@users.noreply.github.com';
    const Label = core.getInput('LABEL') || 'joke';
    const StartMarker = core.getInput('START_MARKER') || '<!--START_SECTION:dev-jokes-->';
    const EndMarker = core.getInput('END_MARKER') || '<!--END_SECTION:dev-jokes-->';
    const ReadmePath = core.getInput('README_PATH') || 'README.md';

    // Get repository info from context
    const RepoOwner = github.context.repo.owner;
    const RepoName = github.context.repo.repo;

    if (!GitHubToken) {
      throw new Error('GITHUB_TOKEN is required! Please provide it as input or secret.');
    }

    // Initialize GitHub service
    const GitHubServiceInstance = new GitHubService(
      RepoOwner,
      RepoName,
      GitHubToken,
      Label
    );

    // Fetch joke issues
    const JokeIssues = await GitHubServiceInstance.FetchJokeIssues();

    // Select random joke
    const SelectedJoke = SelectRandomJoke(JokeIssues);
    core.info(`\n📝 Selected joke from issue #${SelectedJoke.number}`);

    // Format joke
    const FormattedJoke = FormatJoke(SelectedJoke);
    core.info('\n' + FormattedJoke + '\n');

    // Update README
    UpdateReadme(FormattedJoke, ReadmePath, StartMarker, EndMarker);

    // Commit changes if enabled
    if (CommitByMe) {
      core.info('📝 Committing changes...');
      
      // Configure git
      await exec.exec('git', ['config', '--local', 'user.email', CommitEmail]);
      await exec.exec('git', ['config', '--local', 'user.name', CommitUsername]);
      
      // Add README
      await exec.exec('git', ['add', ReadmePath]);
      
      // Check if there are changes (git diff --staged --quiet returns 1 if there are changes)
      let HasChanges = false;
      const ExitCode = await exec.exec('git', ['diff', '--staged', '--quiet'], {
        ignoreReturnCode: true,
      });
      HasChanges = ExitCode !== 0;

      if (HasChanges) {
        await exec.exec('git', ['commit', '-m', CommitMessage]);
        await exec.exec('git', ['push']);
        core.info('✅ Changes committed and pushed!');
      } else {
        core.info('ℹ️ No changes to commit.');
      }
    }

    core.info('✨ Done!');
  } catch (CaughtError) {
    const ErrorMessage = CaughtError instanceof Error ? CaughtError.message : 'Unknown error';
    core.setFailed(`❌ Error: ${ErrorMessage}`);
  }
}

// Run the action
Run();

