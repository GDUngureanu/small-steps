# Testing

[\u2190 Back to documentation index](README.md)

This project uses two different test runners. Components and pages run under
[Vitest](https://vitest.dev) so they can mount Vue code in a browser-like
environment. Composables and router logic rely on Node's built-in test runner,
which provides lightweight coverage reporting via the
`--experimental-test-coverage` flag.

## Test Structure

- `tests/components` and `tests/pages` use Vitest with `@vue/test-utils`.
- `tests/composables` and `tests/router` use the Node test runner.

The reason for splitting the test suites across two tools is not currently
explained in the codebase. If you are unsure which runner to use for new tests,
check with the project maintainers.

## Running Tests

From the project root, run all tests and the linter:

```sh
npm test
```

You can run specific groups of tests:

```sh
npm run test:components   # Vue component tests
npm run test:composables  # Composable logic via Node test runner
npm run test:router       # Router tests via Node test runner
npm run test:pages        # Page-level tests with Vitest
```

## Linting

`npm test` automatically runs ESLint after the test suites. To run the linter
by itself:

```sh
npm run lint
```

## Notes

The documentation does not currently describe how Supabase or other external
services are mocked during testing. If additional setup is required (e.g.
seeding databases or providing environment variables), please update this guide
accordingly.
