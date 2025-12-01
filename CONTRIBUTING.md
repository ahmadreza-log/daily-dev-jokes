# Contributing to Daily Dev Jokes

Thank you for your interest in contributing to Daily Dev Jokes! 🎉

## How to Contribute

### Submitting Jokes

The easiest way to contribute is by submitting jokes:

1. Go to the [Issues](https://github.com/ahmadreza-log/daily-dev-jokes/issues) page
2. Click **"New Issue"**
3. Select the **"🎭 Submit a Joke"** template
4. Fill in the form:
   - Write your best developer joke
   - Optionally add a meme image URL
   - Select the language
   - Confirm code of conduct
5. Submit the issue!

Once your issue is closed, it will be eligible to appear in README files across all repositories using this action! 🎊

### Code Contributions

We welcome code contributions! Here's how to get started:

#### Prerequisites

- Node.js 20+
- npm or yarn
- Git

#### Setup

1. **Fork the repository**
   ```bash
   # Click the Fork button on GitHub, then:
   git clone https://github.com/YOUR_USERNAME/daily-dev-jokes.git
   cd daily-dev-jokes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**
   - Follow the PascalCase naming convention
   - Write TypeScript with strict types
   - Add comments for complex logic
   - Test your changes locally

5. **Build and test**
   ```bash
   npm run build
   npm run dev  # Test locally with .env file
   ```

6. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

7. **Push and create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

#### Code Style Guidelines

- **Naming**: Use PascalCase for all variables, functions, and types
- **Types**: Always use TypeScript types, avoid `any`
- **Comments**: Add JSDoc comments for public functions
- **Formatting**: Follow existing code style
- **Testing**: Test your changes before submitting

#### Commit Message Format

We follow conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

Example:
```
feat: add support for custom joke formatting
fix: resolve markdown rendering issue
docs: update README with new examples
```

### Reporting Issues

Found a bug or have a feature request?

1. Check if the issue already exists
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Environment details (OS, Node version, etc.)

### Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Ensure all tests pass**
4. **Update CHANGELOG** if applicable
5. **Request review** from maintainers

### Code Review

All submissions require review. We aim to:
- Respond within 48 hours
- Provide constructive feedback
- Help improve your contribution

### Questions?

- Open a [Discussion](https://github.com/ahmadreza-log/daily-dev-jokes/discussions)
- Check existing [Issues](https://github.com/ahmadreza-log/daily-dev-jokes/issues)

Thank you for contributing! 🙏

