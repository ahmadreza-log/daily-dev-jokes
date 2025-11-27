# Daily Dev Jokes 🤣

A fun repository for sharing developer jokes and memes! Submit an issue with "joke" in the title and your joke in the body, and it will be displayed randomly in this README.

## Today's Joke

<!--START_SECTION:dev-jokes-->

> Question: Favourite actor of a JavaScript Developer is?
>
> Answer: JSON Statham

![Joke Image](https://raw.githubusercontent.com/shrutikapoor08/devjoke/master/images/E12OmzjXoAAzVvh.jpeg)


> — ahmadreza-log

<!--END_SECTION:dev-jokes-->

## How to Contribute

1. Go to the [Issues](https://github.com/ahmadreza-log/daily-dev-jokes/issues) page
2. Click "New Issue"
3. Select the **"🎭 Submit a Joke"** template
4. Fill in the form:
   - 🎤 **Your Hilarious Joke**: Write your best developer joke
   - 🖼️ **Meme Image URL** (optional): Add a meme image URL if you have one
   - 🌍 **Language**: Select the language of your joke
   - ✅ **Code of Conduct**: Confirm your joke follows community guidelines
5. Submit the issue!

Once your issue is closed, it will be eligible to appear in the daily joke section above! 🎉

## How It Works

This repository uses GitHub Actions to automatically update the README.md every 24 hours with a random joke from closed issues. The script:

1. Fetches all closed issues with the "joke" label (created using the joke template)
2. Parses the issue template to extract:
   - The joke text
   - Optional meme image URL
   - Language information
3. Randomly selects one joke
4. Updates the README.md between the `<!--START_SECTION:dev-jokes-->` markers with formatted content

## 🚀 Quick Start (Recommended)

Add this GitHub Action to your repository! No need to fork or copy files.

### Step 1: Create Workflow File

Create `.github/workflows/daily-joke.yml` in your repository:

```yaml
name: Daily Dev Joke

on:
  workflow_dispatch:
  schedule:
    - cron: "0 0 * * *"  # Run daily at midnight UTC

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
          SOURCE_REPO: "ahmadreza-log/daily-dev-jokes"  # Repository to fetch jokes from
          COMMIT_BY_ME: "True"
          COMMIT_MESSAGE: "🤣 Update daily joke [skip ci]"
          COMMIT_USERNAME: "github-actions[bot]"
          COMMIT_EMAIL: "github-actions[bot]@users.noreply.github.com"
          LABEL: "joke"
          START_MARKER: "<!--START_SECTION:dev-jokes-->"
          END_MARKER: "<!--END_SECTION:dev-jokes-->"
          README_PATH: "README.md"
```

### Step 2: Add Markers to README

Add these markers to your `README.md`:

```markdown
## Today's Joke

<!--START_SECTION:dev-jokes-->
<!--END_SECTION:dev-jokes-->
```

### Step 3: Understanding SOURCE_REPO

The action fetches jokes from a **source repository** (default: `ahmadreza-log/daily-dev-jokes`) and displays them in **your repository's README**. This means:

- ✅ **You don't need to create issues in your repository** - jokes come from the source repo
- ✅ **Multiple repositories can share the same jokes** - just use the same `SOURCE_REPO`
- ✅ **Centralized joke management** - all jokes are managed in one place

If you want to use a different source repository, just change the `SOURCE_REPO` input:

```yaml
SOURCE_REPO: "your-username/your-joke-repo"
```

### Step 4: Create Your First Joke Issue (in Source Repository)

If you want to contribute jokes to the default source repository (`ahmadreza-log/daily-dev-jokes`):

1. Go to [ahmadreza-log/daily-dev-jokes Issues](https://github.com/ahmadreza-log/daily-dev-jokes/issues)
2. Click "New Issue"
3. Use the joke template or create a regular issue
4. Add the "joke" label
5. Close the issue after creating it
6. The action will pick it up on the next run!

That's it! The action will automatically update your README daily with a random joke from the source repository. 🎉

## 📋 Available Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `GITHUB_TOKEN` | GitHub token for API access | No* | `secrets.GITHUB_TOKEN` |
| `SOURCE_REPO` | Source repository to fetch jokes from (format: owner/repo) | No | `ahmadreza-log/daily-dev-jokes` |
| `COMMIT_BY_ME` | Whether to commit changes automatically | No | `True` |
| `COMMIT_MESSAGE` | Commit message for the update | No | `🤣 Update daily joke [skip ci]` |
| `COMMIT_USERNAME` | Username for git commit | No | `github-actions[bot]` |
| `COMMIT_EMAIL` | Email for git commit | No | `github-actions[bot]@users.noreply.github.com` |
| `LABEL` | Label to filter issues | No | `joke` |
| `START_MARKER` | Start marker for README section | No | `<!--START_SECTION:dev-jokes-->` |
| `END_MARKER` | End marker for README section | No | `<!--END_SECTION:dev-jokes-->` |
| `README_PATH` | Path to README file | No | `README.md` |

\* `GITHUB_TOKEN` is automatically provided by GitHub Actions, but you can override it if needed.

## 🚀 Setup & Configuration Guide (Alternative Methods)

### Alternative Method 1: Fork Repository

1. **Fork the Repository:**
   - Click the "Fork" button at the top of the page
   - Fork the repository to your account

2. **Clone the Repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/daily-dev-jokes.git
   cd daily-dev-jokes
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Local Testing (Optional):**
   - Create a GitHub Personal Access Token from: https://github.com/settings/tokens
   - Required permissions: `repo` and `read:org`
   - Create a `.env` file in the project root:
     ```
     GITHUB_TOKEN=your_token_here
     GITHUB_REPOSITORY_OWNER=your_username
     GITHUB_REPOSITORY=your_repo_name
     ```
   - Run:
     ```bash
     npm run dev
     ```

### Method 2: Use in Existing Repository

If you want to add this functionality to an existing repository:

#### Step 1: Copy Files

1. **Copy the `.github` folder:**
   ```bash
   # From this repository
   cp -r .github/ /path/to/your/repo/
   ```

2. **Copy the `src` folder:**
   ```bash
   cp -r src/ /path/to/your/repo/
   ```

3. **Copy root files:**
   ```bash
   cp package.json tsconfig.json .gitignore /path/to/your/repo/
   ```

#### Step 2: Install Dependencies

```bash
cd /path/to/your/repo
npm install
```

#### Step 3: Configure GitHub Actions

1. **Check the Workflow File:**
   - Open `.github/workflows/update-joke.yml`
   - This file automatically uses environment variables
   - No changes needed unless you want to modify the schedule

2. **Configure Schedule (Optional):**
   ```yaml
   schedule:
     # Format: minute hour day month day-of-week
     # Example: Every day at 12:00 UTC
     - cron: '0 12 * * *'
   ```
   
   Other examples:
   - Every 6 hours: `'0 */6 * * *'`
   - Every 12 hours: `'0 */12 * * *'`
   - Weekly: `'0 0 * * 0'` (Sundays)
   - Monthly: `'0 0 1 * *'` (First of each month)

#### Step 4: Setup Issue Templates

1. **Copy Issue Templates:**
   ```bash
   cp -r .github/ISSUE_TEMPLATE/ /path/to/your/repo/.github/
   ```

2. **Customize Template (Optional):**
   - Open `.github/ISSUE_TEMPLATE/joke.yml`
   - You can modify fields, languages, or validations

#### Step 5: Add Markers to README

In your `README.md` file, add the following section:

```markdown
## Today's Joke

<!--START_SECTION:dev-jokes-->
<!--END_SECTION:dev-jokes-->
```

**Important:** These markers must be exactly as shown for the script to find them.

#### Step 6: Enable GitHub Actions

1. **Check Permissions:**
   - Go to Settings → Actions → General
   - Make sure "Workflow permissions" is set to "Read and write permissions"

2. **Manual Run (for testing):**
   - Go to the "Actions" tab in your repository
   - Select the "Update Daily Joke" workflow
   - Click "Run workflow"
   - If everything is correct, the README will be updated

#### Step 7: Create First Issue

1. Go to the Issues page
2. Click "New Issue"
3. Select the "🎭 Submit a Joke" template
4. Fill out the form and submit
5. Close the issue (after closing, it will be eligible for the joke list)

### 🔧 Advanced Configuration

#### Change Repository Owner/Name

If the repository name or owner is different, you can modify it in the workflow file:

```yaml
env:
  GITHUB_REPOSITORY: ${{ github.repository }}  # Automatic
  GITHUB_REPOSITORY_OWNER: ${{ github.repository_owner }}  # Automatic
```

Or if you want to use a different repository:

```yaml
env:
  GITHUB_REPOSITORY: owner/repo-name
  GITHUB_REPOSITORY_OWNER: owner
```

#### Using Personal Access Token

If you want to use a different repository:

1. Create a Personal Access Token
2. Go to Settings → Secrets and variables → Actions
3. Add a new secret named `GITHUB_TOKEN`
4. In the workflow file:
   ```yaml
   env:
     GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
   ```

#### Change Label

If you want to use a different label instead of "joke":

1. In `.github/ISSUE_TEMPLATE/joke.yml`:
   ```yaml
   labels: 
     - "your-custom-label"
   ```

2. In `src/services/github.service.ts`:
   ```typescript
   labels: 'your-custom-label',
   ```

### 🧪 Testing

#### Local Testing:

```bash
# Install dependencies
npm install

# Create .env file
echo "GITHUB_TOKEN=your_token" > .env
echo "GITHUB_REPOSITORY_OWNER=your_username" >> .env
echo "GITHUB_REPOSITORY=your_repo" >> .env

# Run
npm run dev
```

#### Testing in GitHub Actions:

1. Go to the Actions tab
2. Manually trigger the workflow
3. Check the logs
4. Verify that the README has been updated

### ❓ Common Issues

**Issue:** README is not updating
- ✅ Make sure markers exist in README
- ✅ Make sure the workflow has run
- ✅ Check GitHub Actions logs

**Issue:** "No joke issues found"
- ✅ Make sure an issue with the "joke" label exists
- ✅ Make sure the issue is closed
- ✅ Make sure the issue used the template

**Issue:** Build fails
- ✅ Make sure Node.js version 20+ is installed
- ✅ Run `npm install` again
- ✅ Check TypeScript errors

### 📚 منابع بیشتر

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Issue Templates Guide](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository)
- [Octokit Documentation](https://octokit.github.io/rest.js/)

## 📄 License

ISC

