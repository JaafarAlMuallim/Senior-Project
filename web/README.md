## Getting Started

First, install packages:

```bash
pnpm install
```

Second, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## References

- [Figma](https://www.figma.com/design/5k8xTl5jkWyIShEKXxdNOM/Senior-Project)
- [Shadcn UI](https://ui.shadcn.com/docs)
  - Note: Some components are already installed in /components/ui, utilize them for tables and charts.
    Tables should be [Data-Table](https://ui.shadcn.com/docs/components/data-table), adding the columns we want, selecting the columns / rows we want to show.

## Standards

#### Workflow

- Each feature should be developed in a separate branch
- Each feature should have some tests before merging to the main branch
- Try to make commits descriptive and concise.
- Try to make commits atomic
- Each PR should have a breif description of which feature is being added or fixed, changed files, issue number if available.
- After submitting a PR, assign [@JaafarAlMuallim](https://www.github.com/JaafarAlMuallim) as a reviewer.

#### Branching

- Branches should be named in the following format: `type/feature-web`.
- Type Includes: `feat`, `fix`, `refactor`, `docs`, `chore`, `test`.
- Example: `feat/msg-chart-web`, `refactor/msg-table-web`.
