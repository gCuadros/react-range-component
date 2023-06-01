## What's inside?

A Next application configured manually without using any CLI, that renders a completely customized input range.

### Libraries and Utilities

- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`) for react projects
- `jest-config-react`: `eslint` configurations for react projects
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `react-query`:React Query is a library for handling remote data fetching and caching in React applications. It simplifies API requests, data synchronization, and state management, offering features like caching, background updates, and optimistic UI. It seamlessly integrates with React components and supports pagination, optimistic updates, and error handling.

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Install

The first step, necessary to install all libraries

```
In the root directory
npm install
```

### Build

To build all apps and packages, run the following command:

```
In the root directory
npm run build
```

### Develop

To develop web app, run the following command:

```
In the root directory
npm run dev
```

### unit Tests

To execute tests, run the following command:

```
In root directory
npm run test
```

### Deployment

Currently, the develop branch is deployed through Vercel at the following [URL](https://react-range-component.vercel.app/)

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
