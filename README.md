# ParaBank QA — Playwright + TypeScript

End-to-end UI and API tests for the [ParaBank](https://parabank.parasoft.com/parabank/) demo banking app. The tests use the Page Object Model. The repo also contains manual test cases for Transfer Funds and bug reports for bugs found during exploratory testing.

## Deliverables

- [Test cases](docs/TEST_CASES_TRANSFER_FUNDS.md)
- [Bug reports](docs/BUG_REPORTS.md)
- [Automated tests](docs/AUTOMATED_TEST_CASES.md)
- Code: [tests/](tests/) and [pages/](pages/)

## What is tested

- UI-01 - Register
- UI-02 - Log in and view accounts
- UI-03 - Transfer funds
- API-01 - Login API

## Quick start

Requirements: Node.js 18+ (tested on Node 24) and npm.

```bash
npm install                        # install Playwright and TypeScript
npx playwright install chromium    # download the browser
npm test                           # run all tests
npx playwright show-report         # open the HTML report
```

### Log in manually with a test user

Each test registers a new user. To log in to [ParaBank](https://parabank.parasoft.com/parabank/) with that user and check the result yourself:

1. Run `npm test`, then `npx playwright show-report`.
2. Click a test and open **Annotations**. It shows `Test user: <username> / <password>`.
3. Use these credentials on the ParaBank login page.

### Other ways to run

```bash
npm run test:ui                                      # only UI tests
npm run test:api                                     # only API tests
npx playwright test --headed                         # watch the browser while tests run
npx playwright test --ui                             # interactive UI mode, step through each action
npx playwright test tests/ui/transfer.spec.ts        # run a single test file
npx playwright test --workers=1                      # run one test at a time
```

By default 4 tests run in parallel (see [Configuration](#configuration)).

## Project structure

```
parabank-qa-playwright/
├── pages/                  Page Objects: locators + actions + assertions for each page
│   ├── RegisterPage.ts       goto(), register(user), expectSuccess(username)
│   ├── LoginPage.ts          login(), logout(), expectLoggedIn()
│   ├── AccountsPage.ts       goto(), expectOverview(), getFirstAccountId(), getBalance(id)
│   ├── OpenAccountPage.ts    createSavingsAccount() → new account id
│   └── TransferPage.ts       goto(), transfer(amount, from, to), expectTransferComplete()
├── tests/
│   ├── ui/                 UI scenarios (UI-01, UI-02, UI-03)
│   └── api/                API scenario (API-01)
├── test-data/users.ts      createTestUser(): new user with a unique username and password
├── docs/
│   ├── TEST_CASES_TRANSFER_FUNDS.md  manual test cases for the Transfer Funds feature
│   ├── AUTOMATED_TEST_CASES.md       what each automated test does and checks
│   └── BUG_REPORTS.md                bugs found during exploratory testing
├── playwright.config.ts    base URL, browser, timeouts, retries, workers, reporters, traces
└── tsconfig.json
```

## Page Object Model

Each page has its own class with its locators and actions. A test creates the page objects it needs and calls their methods, so it reads like a user scenario:

```ts
const registerPage = new RegisterPage(page);
const user = createTestUser();

await registerPage.goto();
await registerPage.register(user);
await registerPage.expectSuccess(user.username);
```

If a locator changes, it is fixed in one place, the page class, and not in every test.

## Configuration

Everything is set in [playwright.config.ts](playwright.config.ts) and can be changed with environment variables:

| Setting                                     | Default                                   | Variable   |
| ------------------------------------------- | ----------------------------------------- | ---------- |
| Base URL                                    | `https://parabank.parasoft.com/parabank/` | `BASE_URL` |
| Parallel workers                            | 4                                         | `WORKERS`  |
| Retries                                     | 1                                         | `RETRIES`  |
| Test / expect / action / navigation timeout | 60s / 10s / 15s / 30s                     | -          |
| Browser                                     | Chromium (Desktop Chrome)                 | -          |

## Test data approach

- Test data is kept in one place, [test-data/users.ts](test-data/users.ts), and not written inside the tests.
- Every test calls `createTestUser()` and registers its own new user. The username (`qa` + 10 hex characters) and the password are random, so no credentials are hard-coded and data is unique on every run.
- Tests don't share data and don't depend on each other's order, so they can run in parallel and be repeated on the public demo site.
- Data that the app creates, like account numbers and balances, is not hard-coded. The test reads it from the page (for example `getFirstAccountId()` and `getBalance(id)`) and uses it in the next steps.
- Every test shows the user it registered (`username / password`) in the HTML report (open a test and look at "Annotations"), so the same user can be used to log in manually on the ParaBank site and check the result. These are throwaway users on a public demo site.

## API test

API-01 creates the user through the UI, because ParaBank has no REST endpoint for registration. Then it calls `GET services/bank/login/{username}/{password}` with Playwright's `request` client and checks the status code (`200`), the customer fields and that `id` is a number.

## Debugging

A trace, a screenshot and a video are saved for any failed test (`test-results/`). Open the trace with `npx playwright show-trace <path-to-trace.zip>`.

## Test results

ParaBank is a shared public demo, so results depend on the server. Its database is reset from time to time, and sometimes it returns errors such as `This username already exists.` for every new user or `An internal error has occurred` on login. In that case the tests fail during registration or login, not because of the test code.

Because of this, a failed test is retried once (`retries: 1` in `playwright.config.ts`). A test that passes on the retry is marked as "flaky" in the HTML report. If tests still fail, running them again later usually helps.

## Bugs found

Full steps, expected and actual results are in [docs/BUG_REPORTS.md](docs/BUG_REPORTS.md):

1. BUG-01 - Transfer Funds accepts a negative amount
2. BUG-02 - Request Loan accepts a negative Down Payment

Other findings, not reported as bugs because of the two-bug limit (details in [the test cases](docs/TEST_CASES_TRANSFER_FUNDS.md)):

- TC-TF-07 - Transfer Funds allows a transfer larger than the available balance
- TC-TF-13 - Transfer Funds allows a transfer to the same account

## Scope and next steps

- UI-03 checks the `Transfer Complete!` message and that both balances changed by the amount (TC-TF-02). It does not yet check the transaction history (TC-TF-03).
- The bugs above are documented but not automated, because the tests would fail on the current app. They are good candidates for negative tests.
- Every test registers its own user, so no login code is repeated in the tests. If many more tests that need a logged-in user are added, registration can be done once in a Playwright setup project and shared with `storageState`.
