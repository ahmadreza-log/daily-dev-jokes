# Security Policy

## Supported Versions

We actively support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0.0 | :x:                |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability, please follow these steps:

### 1. **Do NOT** open a public issue

Security vulnerabilities should be reported privately to protect users.

### 2. Report via GitHub Security Advisories

1. Go to the [Security](https://github.com/ahmadreza-log/daily-dev-jokes/security) tab
2. Click **"Report a vulnerability"**
3. Fill out the security advisory form with:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### 3. Alternative: Email

If you prefer, you can email security concerns to the repository maintainer (if contact information is available).

## What to Report

Please report:

- ✅ Authentication or authorization flaws
- ✅ Data exposure or leakage
- ✅ Injection vulnerabilities (XSS, SQL injection, etc.)
- ✅ Insecure dependencies
- ✅ Privilege escalation issues
- ✅ Any security-related bug

## What NOT to Report

Please do NOT report:

- ❌ Issues that require physical access to the system
- ❌ Social engineering attacks
- ❌ Denial of service (DoS) attacks
- ❌ Issues in dependencies (report to the dependency maintainer)
- ❌ Spam or content issues

## Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity (typically 30-90 days)

## Security Best Practices

When using this action:

1. **Use Official Versions**: Always use tagged releases, not `@master`
2. **Review Permissions**: Only grant necessary permissions to workflows
3. **Token Security**: Never commit tokens or secrets to repositories
4. **Dependency Updates**: Keep dependencies up to date
5. **Regular Audits**: Review workflow logs regularly

## Security Considerations

### GitHub Token

- The action requires a GitHub token to access the API
- Use `secrets.GITHUB_TOKEN` (automatically provided) when possible
- For cross-repository access, use a Personal Access Token with minimal required scopes

### Permissions

The action requires:
- `contents: write` - To update README.md
- `issues: read` - To fetch issues from source repository

### Data Handling

- The action only reads public issue data
- No sensitive data is stored or transmitted
- All processing happens in GitHub Actions runners

## Disclosure Policy

- Vulnerabilities will be disclosed after a fix is available
- We will credit security researchers who responsibly disclose vulnerabilities
- A security advisory will be published for significant vulnerabilities

## Thank You

Thank you for helping keep Daily Dev Jokes and its users safe! 🙏

