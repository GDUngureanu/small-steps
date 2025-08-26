# Testing

[\u2190 Back to documentation index](README.md)

This project uses [Vitest](https://vitest.dev) for unit and component tests and [Playwright](https://playwright.dev) for end-to-end checks.

## Structure

- `tests/domains` – domain-level units and composables.
- `tests/core` – core components and configuration helpers.
- `tests/e2e` – browser-driven scenarios with Playwright.

## Running tests

Run every suite:

```sh
npm test
```

Run suites individually:

```sh
npm run test:domains   # domain logic
npm run test:core      # core components
npm run test:e2e       # Playwright flows
```

## Continuous integration

GitHub Actions executes `npm run lint:check` and `npm test` on pull requests. See `.github/workflows/continuous-integration.yml` for details.

## Linting

Run ESLint separately with:

```sh
npm run lint
```
