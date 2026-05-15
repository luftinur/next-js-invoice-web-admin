# Contributing

Thank you for considering contributing to InvoiceCore Admin Theme.

## Development Setup

```bash
git clone https://github.com/luftinur/next-js-invoice-web-admin.git
cd next-js-invoice-web-admin
npm install
npm run dev
```

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — new feature
- `fix:` — bug fix
- `chore:` — maintenance, tooling, dependencies
- `docs:` — documentation
- `refactor:` — code restructuring
- `style:` — formatting, styling
- `perf:` — performance improvement

## Pull Request Process

1. Fork the repository
2. Create a branch: `feat/your-feature-name` or `fix/your-bug-name`
3. Make your changes
4. Run `npm run build` to verify no errors
5. Submit a PR with a clear description of the changes

## Code Standards

- TypeScript strict mode
- PascalCase for component files and names
- `cn()` for classname merging
- Use existing patterns (Zustand for state, server actions for mutations)
