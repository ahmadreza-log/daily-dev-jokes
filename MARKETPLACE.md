# GitHub Marketplace Submission Guide

## Prerequisites

Before submitting to GitHub Marketplace, ensure:

1. ✅ **Repository is public**
2. ✅ **action.yml exists** with proper metadata
3. ✅ **README.md** is comprehensive and clear
4. ✅ **Releases are created** (automatic via workflow)
5. ✅ **License file exists** (ISC)

## How to Submit

1. Go to your repository on GitHub
2. Click on **Settings** → **Marketplace**
3. Click **Draft a new listing**
4. Fill in the required information:
   - **Name**: Daily Dev Jokes
   - **Category**: Developer Tools
   - **Description**: Automatically update your README with random developer jokes from closed GitHub issues
   - **Icon**: Use the smile emoji or upload a custom icon
   - **Color**: Yellow (#FFC107)
   - **Pricing**: Free

5. **Publishing options**:
   - Select **Published** to make it available immediately
   - Or **Unpublished** to review first

6. **Version selection**:
   - Use semantic versioning (v1.0.0, v1.1.0, etc.)
   - The release workflow automatically creates releases when version changes

## Version Management

To create a new release:

1. Update `version` in `package.json`:
   ```json
   {
     "version": "1.1.0"
   }
   ```

2. Commit and push:
   ```bash
   git add package.json
   git commit -m "chore: bump version to 1.1.0"
   git push
   ```

3. The workflow will automatically:
   - Detect version change
   - Create a new release with tag `v1.1.0`
   - Generate changelog from commits

## Marketplace Requirements Checklist

- [x] action.yml with proper metadata
- [x] Comprehensive README.md
- [x] License file (ISC)
- [x] Public repository
- [x] Automatic release workflow
- [x] Clear description and usage examples
- [x] Input/output documentation

## Tips

- Keep version numbers semantic (major.minor.patch)
- Write clear commit messages (they become changelog)
- Test the action thoroughly before publishing
- Update README with new features
- Respond to user issues and feedback

