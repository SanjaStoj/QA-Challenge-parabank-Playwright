<!-- To open this file in preview mode, press Ctrl+Shift+V (or Ctrl+K V to open the preview on the side). -->

# ParaBank – Bug Reports

- BUG-01 - Transfer Funds accepts a negative amount - Severity: Critical - Priority: High
- BUG-02 - Request Loan accepts a negative Down Payment - Severity: Critical - Priority: High

---

## BUG-01 — Transfer Funds accepts a negative amount

- Browser: Chrome
- Environment URL: https://parabank.parasoft.com/parabank/
- Page: Transfer Funds
- Severity: Critical
- Priority: High
- Happens: Every time
- Related test case: [TC-TF-09](TEST_CASES_TRANSFER_FUNDS.md)

Preconditions: The user is logged in and has two accounts:

- Account A (CHECKING) with $415.50
- Account B (SAVINGS) with $100.00

Steps to reproduce:

1. Click Transfer Funds in the menu.
2. Enter -100 in Amount.
3. Select account A in From account and account B in To account.
4. Click Transfer.
5. Open Accounts Overview and check the balances.

Expected result:

- An error message is shown that the amount must be greater than 0.
- No money is transferred. The balances stay the same.

Actual result:

- The transfer is accepted with the message "Transfer Complete! -$100.00 has been transferred from account #A to account #B."
- The money goes the other way: $100 is taken from account B and added to account A.

| Account | Before  | After   |
| ------- | ------- | ------- |
| A       | $415.50 | $515.50 |
| B       | $100.00 | $0.00   |

---

## BUG-02 — Request Loan accepts a negative Down Payment

- Browser: Chrome
- Environment URL: https://parabank.parasoft.com/parabank/
- Page: Request Loan
- Severity: Critical
- Priority: High
- Happens: Every time

Preconditions: The user is logged in. Account A (CHECKING) has $515.50.

Steps to reproduce:

1. Click Request Loan in the menu.
2. Enter 100 in Loan Amount.
3. Enter -99999 in Down Payment.
4. Select account A in From account.
5. Click Apply Now.
6. Open Accounts Overview and check the balances.

Expected result:

- An error message is shown that the down payment cannot be negative.
- The loan is not approved. The balance of account A stays the same.

Actual result:

- The loan is approved and a new LOAN account with $100.00 is created.
- Instead of taking money from account A, $99,999 is added to it.

| Account  | Before  | After       |
| -------- | ------- | ----------- |
| A        | $515.50 | $100,514.50 |
| New LOAN | —       | $100.00     |
