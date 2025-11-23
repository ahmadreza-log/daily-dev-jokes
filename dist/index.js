"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = Main;
const config_1 = require("./config");
const github_service_1 = require("./services/github.service");
const joke_util_1 = require("./utils/joke.util");
const readme_util_1 = require("./utils/readme.util");
/**
 * Main function
 */
async function Main() {
    try {
        console.log('🚀 Starting daily joke update...\n');
        // Get configuration
        const Config = (0, config_1.GetConfig)();
        // Initialize GitHub service
        const GitHubServiceInstance = new github_service_1.GitHubService(Config.RepoOwner, Config.RepoName, Config.GitHubToken);
        // Fetch joke issues
        const JokeIssues = await GitHubServiceInstance.FetchJokeIssues();
        // Select random joke
        const SelectedJoke = (0, joke_util_1.SelectRandomJoke)(JokeIssues);
        console.log(`\n📝 Selected joke from issue #${SelectedJoke.number}`);
        // Format joke
        const FormattedJoke = (0, joke_util_1.FormatJoke)(SelectedJoke);
        console.log('\n' + FormattedJoke + '\n');
        // Update README
        (0, readme_util_1.UpdateReadme)(FormattedJoke);
        console.log('✨ Done!');
    }
    catch (CaughtError) {
        const ErrorMessage = CaughtError instanceof Error ? CaughtError.message : 'Unknown error';
        console.error('❌ Error:', ErrorMessage);
        process.exit(1);
    }
}
// Run the script
if (require.main === module) {
    Main();
}
//# sourceMappingURL=index.js.map