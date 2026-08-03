# Daily Dev Jokes 🤣

> A reusable GitHub Action that automatically updates your README with random developer jokes from closed GitHub issues. Perfect for adding some humor to your profile or repository!

[![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-Reusable%20Action-blue)](https://github.com/features/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-ISC-green)](LICENSE)

## ✨ Features

- 🎲 **Random Joke Selection** - Automatically picks a random joke from closed issues
- 🔄 **Automatic Updates** - Updates your README on a schedule (daily, hourly, or custom)
- 📚 **Centralized Source** - Fetch jokes from a shared repository (default: `ahmadreza-log/daily-dev-jokes`)
- 🎨 **Customizable Formatting** - Clean, minimal markdown output with proper line breaks
- 🏷️ **Label-Based Filtering** - Filter issues by custom labels
- 🖼️ **Image Support** - Optional meme images in jokes
- 🔧 **Fully Configurable** - Extensive input options for customization
- 🚀 **Zero Setup** - Works out of the box with GitHub Actions

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [How It Works](#-how-it-works)
- [Inputs Reference](#-inputs-reference)
- [Usage Examples](#-usage-examples)
- [Project Structure](#-project-structure)
- [Architecture](#-architecture)
- [Development](#-development)
- [Contributing](#-contributing)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

## 🚀 Quick Start

### Step 1: Create Workflow File

Create `.github/workflows/daily-joke.yml` in your repository:

```yaml
name: Daily Dev Joke

on:
  workflow_dispatch:  # Manual trigger
  schedule:
    - cron: "0 0 * * *"  # Daily at midnight UTC

jobs:
  update-readme:
    name: Update Daily Joke
    runs-on: ubuntu-latest
    permissions:
      contents: write
      issues: read
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      
      - name: Update README with daily joke
        uses: ahmadreza-log/daily-dev-jokes@master
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SOURCE_REPO: "ahmadreza-log/daily-dev-jokes"
```

### Step 2: Add Markers to README

Add these markers to your `README.md` file:

```markdown
## Today's Joke

<!--START_SECTION:dev-jokes-->

> Frontend VS. Backend

![Joke Image](https://github.com/shrutikapoor08/devjoke/raw/master/images/j55.jpg)


> — ahmadreza-log

<!--END_SECTION:dev-jokes-->
```

### Step 3: Run the Workflow

1. Go to **Actions** tab in your repository
2. Select **"Daily Dev Joke"** workflow
3. Click **"Run workflow"**
4. Your README will be updated with a random joke! 🎉

## 🎯 How It Works

### Overview

The action follows a simple workflow:

1. **Fetch Issues** - Retrieves all closed issues with the specified label from the source repository
2. **Parse Content** - Extracts joke text, optional image URL, and metadata from issue body
3. **Random Selection** - Randomly selects one joke from the available pool
4. **Format Output** - Formats the joke with proper markdown blockquotes and line breaks
5. **Update README** - Replaces content between markers in your README.md
6. **Commit Changes** - Optionally commits and pushes the changes automatically

### Source Repository Concept

The action uses a **source repository** pattern:

- **Source Repository**: Where jokes are stored (default: `ahmadreza-log/daily-dev-jokes`)
- **Target Repository**: Where the README is updated (your repository)

This allows:
- ✅ Multiple repositories to share the same joke pool
- ✅ Centralized joke management
- ✅ No need to create issues in every repository

### Issue Template Format

The action expects issues created with the joke template (`.github/ISSUE_TEMPLATE/joke.yml`):

- **Joke Text** (required): The main joke content
- **Meme Image URL** (optional): Direct image URL for memes
- **Language** (required): Language of the joke

Issues must be:
- ✅ Closed (not open)
- ✅ Labeled with the specified label (default: `joke`)
- ✅ Regular issues (not pull requests)

## 📋 Inputs Reference

| Input | Description | Required | Default | Example |
|-------|-------------|----------|---------|---------|
| `GITHUB_TOKEN` | GitHub token for API access | No* | `secrets.GITHUB_TOKEN` | `${{ secrets.GITHUB_TOKEN }}` |
| `SOURCE_REPO` | Source repository to fetch jokes from (format: `owner/repo`) | No | `ahmadreza-log/daily-dev-jokes` | `"username/repo-name"` |
| `COMMIT_BY_ME` | Whether to commit changes automatically | No | `True` | `"True"` or `"False"` |
| `COMMIT_MESSAGE` | Commit message for the update | No | `🤣 Update daily joke [skip ci]` | `"Update joke"` |
| `COMMIT_USERNAME` | Username for git commit | No | `github-actions[bot]` | `"my-bot"` |
| `COMMIT_EMAIL` | Email for git commit | No | `github-actions[bot]@users.noreply.github.com` | `"bot@example.com"` |
| `LABEL` | Label to filter issues | No | `joke` | `"humor"` |
| `START_MARKER` | Start marker for README section | No | `<!--START_SECTION:dev-jokes-->` | `<!--JOKE_START-->` |
| `END_MARKER` | End marker for README section | No | `<!--END_SECTION:dev-jokes-->` | `<!--JOKE_END-->` |
| `README_PATH` | Path to README file | No | `README.md` | `"docs/README.md"` |

\* `GITHUB_TOKEN` is automatically provided by GitHub Actions, but you can override it if needed.

## 💡 Usage Examples

### Basic Usage

Minimal configuration - uses all defaults:

```yaml
- uses: ahmadreza-log/daily-dev-jokes@master
  with:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Custom Source Repository

Use jokes from your own repository:

```yaml
- uses: ahmadreza-log/daily-dev-jokes@master
  with:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    SOURCE_REPO: "your-username/your-joke-repo"
```

### Custom Label

Filter issues by a different label:

```yaml
- uses: ahmadreza-log/daily-dev-jokes@master
  with:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    LABEL: "humor"
```

### Custom Markers

Use different markers in your README:

```yaml
- uses: ahmadreza-log/daily-dev-jokes@master
  with:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    START_MARKER: "<!--JOKE_START-->"
    END_MARKER: "<!--JOKE_END-->"
```

### Disable Auto-Commit

Only update README without committing:

```yaml
- uses: ahmadreza-log/daily-dev-jokes@master
  with:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    COMMIT_BY_ME: "False"
```

### Custom Schedule

Update every 6 hours:

```yaml
on:
  schedule:
    - cron: "0 */6 * * *"  # Every 6 hours
```

### Multiple Repositories

Share jokes across multiple repositories by using the same `SOURCE_REPO`:

```yaml
# Repository 1
- uses: ahmadreza-log/daily-dev-jokes@master
  with:
    SOURCE_REPO: "shared-org/jokes-repo"

# Repository 2 (same source)
- uses: ahmadreza-log/daily-dev-jokes@master
  with:
    SOURCE_REPO: "shared-org/jokes-repo"
```

## 🏗️ Project Structure

```
daily-dev-jokes/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── joke.yml          # Issue template for submitting jokes
│   │   └── config.yml        # Issue template configuration
│   └── workflows/
│       ├── update-joke.yml   # Workflow for this repository
│       └── release.yml        # Auto-release workflow
├── src/
│   ├── action.ts             # GitHub Action entry point
│   ├── index.ts              # Standalone script entry point
│   ├── config/
│   │   └── index.ts          # Configuration management
│   ├── services/
│   │   └── github.service.ts # GitHub API service
│   ├── types/
│   │   └── index.ts          # TypeScript type definitions
│   └── utils/
│       ├── joke.util.ts      # Joke formatting utilities
│       ├── parser.util.ts    # Issue body parser
│       └── readme.util.ts    # README update utilities
├── dist/                     # Compiled JavaScript (committed for action)
├── action.yml                # Action metadata
├── pre.js                    # Pre-install script for dependencies
├── package.json              # Node.js dependencies
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## 🏛️ Architecture

### Component Overview

#### 1. **GitHub Service** (`src/services/github.service.ts`)
   - Handles all GitHub API interactions
   - Fetches closed issues with specified label
   - Filters out pull requests
   - Supports custom repository and label configuration

#### 2. **Parser Utility** (`src/utils/parser.util.ts`)
   - Parses GitHub issue body to extract template fields
   - Supports multiple pattern matching for robustness
   - Extracts joke text, image URL, and language
   - Handles edge cases and malformed input

#### 3. **Joke Utility** (`src/utils/joke.util.ts`)
   - Selects random joke from available issues
   - Formats joke with proper markdown blockquotes
   - Ensures proper line breaks for markdown rendering
   - Handles optional image URLs

#### 4. **README Utility** (`src/utils/readme.util.ts`)
   - Updates README.md with new joke content
   - Supports custom markers and file paths
   - Validates marker presence
   - Preserves existing README content

#### 5. **Configuration** (`src/config/index.ts`)
   - Manages environment variables
   - Provides default values
   - Validates required configuration

### Data Flow

```
GitHub API
    ↓
GitHubService.FetchJokeIssues()
    ↓
SelectRandomJoke()
    ↓
ParseIssueBody()
    ↓
FormatJoke()
    ↓
UpdateReadme()
    ↓
README.md (Updated)
```

### Type System

The project uses TypeScript with strict typing:

- **`Issue`**: GitHub issue type from Octokit
- **`Config`**: Configuration interface
- **`ParsedJoke`**: Extracted joke data structure

## 🛠️ Development

### Prerequisites

- Node.js 20+
- npm or yarn
- TypeScript 5.3+

### Setup

```bash
# Clone the repository
git clone https://github.com/ahmadreza-log/daily-dev-jokes.git
cd daily-dev-jokes

# Install dependencies
npm install

# Build TypeScript
npm run build
```

### Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Build and run the standalone script |
| `npm run dev` | Run TypeScript directly with ts-node |

### Local Testing

1. Create a `.env` file:
   ```
   GITHUB_TOKEN=your_personal_access_token
   GITHUB_REPOSITORY_OWNER=your_username
   GITHUB_REPOSITORY=your_repo_name
   ```

2. Run the script:
   ```bash
   npm run dev
   ```

### Code Style

- **Naming Convention**: PascalCase for all variables, functions, and types
- **File Structure**: Modular architecture with separation of concerns
- **Type Safety**: Strict TypeScript with full type coverage

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Submitting Jokes

1. Go to [Issues](https://github.com/ahmadreza-log/daily-dev-jokes/issues)
2. Click **"New Issue"**
3. Select **"🎭 Submit a Joke"** template
4. Fill in the form and submit
5. Close the issue after review

### Code Contributions

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit with clear messages (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines

- Follow PascalCase naming convention
- Write TypeScript with strict types
- Add comments for complex logic
- Test your changes locally
- Update documentation if needed

## 🐛 Troubleshooting

### README Not Updating

**Symptoms**: README remains unchanged after workflow runs

**Solutions**:
- ✅ Verify markers exist in README: `<!--START_SECTION:dev-jokes-->` and `<!--END_SECTION:dev-jokes-->`
- ✅ Check workflow execution logs in Actions tab
- ✅ Ensure workflow has `contents: write` permission
- ✅ Verify `COMMIT_BY_ME` is set to `"True"` if you want auto-commit

### "No joke issues found"

**Symptoms**: Action fails with "No joke issues found" error

**Solutions**:
- ✅ Ensure issues exist in source repository with the specified label
- ✅ Verify issues are **closed** (not open)
- ✅ Check that issues are regular issues (not pull requests)
- ✅ Confirm label name matches `LABEL` input (default: `"joke"`)
- ✅ Verify `SOURCE_REPO` points to the correct repository

### Build Fails

**Symptoms**: TypeScript compilation errors

**Solutions**:
- ✅ Ensure Node.js version 20+ is installed
- ✅ Run `npm install` to update dependencies
- ✅ Check TypeScript errors: `npm run build`
- ✅ Verify `tsconfig.json` is correct

### Markdown Not Rendering Correctly

**Symptoms**: Jokes appear on single line instead of multiple lines

**Solutions**:
- ✅ Ensure proper line breaks in issue body
- ✅ Check that blockquote formatting is correct
- ✅ Verify README is using standard markdown renderer

### Permission Errors

**Symptoms**: "Permission denied" or "403 Forbidden" errors

**Solutions**:
- ✅ Verify `GITHUB_TOKEN` has required permissions
- ✅ Check workflow permissions in repository settings
- ✅ Ensure token has `repo` and `read:org` scopes (if needed)

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Issue Templates Guide](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository)
- [Octokit REST API](https://octokit.github.io/rest.js/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [waka-readme-stats](https://github.com/anmol098/waka-readme-stats)
- Built with [GitHub Actions](https://github.com/features/actions)
- Powered by [Octokit](https://github.com/octokit/rest.js)

---

**Made with ❤️ and TypeScript**

If you find this project useful, please consider giving it a ⭐!
