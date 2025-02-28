This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Table of Contents
- [Getting Started](#getting-started)
- [Learn More](#learn-more)
- [Pocketbase Configuration](#pocketbase-configuration)
- [Commit Process](#commit-process)
  - [Making a commit](#making-a-commit)
  - [Types](#types)
- [Release Process](#release-process)
  - [Making a release](#making-a-release)
- [Deploy on Vercel](#deploy-on-vercel)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Pocketbase Configuration

To use the Pocketbase API in this project, you need to set up your API key:

1. Create a `.env.local` file in the root directory of the project
2. Add the following environment variable to the file:
```bash
NEXT_PUBLIC_POCKETBASE_URL="the pocketbase url here"
```

> **Note:** The environment variable name MUST be exactly `NEXT_PUBLIC_POCKETBASE_URL`

## Commit Process

This project uses the tool [commitlint](https://github.com/conventional-changelog/commitlint#what-is-commitlint "Commitlint github") for commits. This is used because it follows [conventional commit format](https://www.conventionalcommits.org/en/v1.0.0/ "Conventional commit home page").

#### Making a commit

Once ready to commit any work the standard format is:

```bash
$ type(scope): subject //scope is optional

example:

feat(categories): add categories page
fix(product): update product page

```

**Types:**

- **build**: Affects the build system or external dependencies.
- **chore**: Other changes that don't modify src or test files
- **ci**: Changes CI configuration files and scripts.
- **docs**: Adds or alters documentation.
- **feat**: Adds a new feature.
- **fix**: Solves a bug.
- **perf**: Improves performance.
- **refactor**: Rewrites code without feature, performance or bug changes.
- **revert**: Reverts a previous commit.
- **style**: Improves code formatting, white-space.
- **test**: Adds or modifies tests.

## Release Process

This project uses the tool [standard-version](https://github.com/conventional-changelog/standard-version#readme "Standard Version github") for versioning.

#### Making a release

To make a release, run the following commands:

```
  yarn release:major: increases version v3.0.0 -> v4.0.0,
  yarn release:minor: increases version v3.0.0 -> v3.1.0,
  yarn release:patch: increases version v3.0.0 -> v3.0.1,
  yarn release:pre: increases the version number for a pre-release candidate v3.0.0-rc-0

```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
