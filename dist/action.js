"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const exec = __importStar(require("@actions/exec"));
const github_service_1 = require("./services/github.service");
const joke_util_1 = require("./utils/joke.util");
const readme_util_1 = require("./utils/readme.util");
/**
 * Main action function
 */
async function Run() {
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
        const GitHubServiceInstance = new github_service_1.GitHubService(RepoOwner, RepoName, GitHubToken, Label);
        // Fetch joke issues
        const JokeIssues = await GitHubServiceInstance.FetchJokeIssues();
        // Select random joke
        const SelectedJoke = (0, joke_util_1.SelectRandomJoke)(JokeIssues);
        core.info(`\n📝 Selected joke from issue #${SelectedJoke.number}`);
        // Format joke
        const FormattedJoke = (0, joke_util_1.FormatJoke)(SelectedJoke);
        core.info('\n' + FormattedJoke + '\n');
        // Update README
        (0, readme_util_1.UpdateReadme)(FormattedJoke, ReadmePath, StartMarker, EndMarker);
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
            }
            else {
                core.info('ℹ️ No changes to commit.');
            }
        }
        core.info('✨ Done!');
    }
    catch (CaughtError) {
        const ErrorMessage = CaughtError instanceof Error ? CaughtError.message : 'Unknown error';
        core.setFailed(`❌ Error: ${ErrorMessage}`);
    }
}
// Run the action
Run();
//# sourceMappingURL=action.js.map