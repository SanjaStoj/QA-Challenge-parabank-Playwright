<!-- To open this file in preview mode, press Ctrl+Shift+V (or Ctrl+K V to open the preview on the side). -->

# Manual Test Cases - Transfer Funds

**Application:** ParaBank  
**Feature:** Transfer Funds  
**Environment URL:** https://parabank.parasoft.com/parabank/  
**Browser:** Chrome  
**Test type:** Functional, Boundary, Negative and Security Testing

## Preconditions

All test cases use one customer with two accounts.
Account A and Account B belong to the same customer, so there is one username and one password.

### Test user

- First Name: Transfer
- Last Name: Tester
- Address: 100 Test Street
- City: Testville
- State: CA
- Zip Code: 90210
- Phone: 5551234567
- SSN: 123456789
- Username: tf_tester02
- Password: Test1234

### Setup steps

1. Open https://parabank.parasoft.com/parabank/register.htm
   - Expected: Signing up form is displayed.
2. Fill in all fields with the test user data above and click Register.
   - Expected: "Welcome tf_tester02" and "Your account was created successfully" are displayed. The user is logged in.
3. Click Accounts Overview.
   - Expected: One CHECKING account is listed. This is Account A. Write down its number.
4. Click Open New Account, select SAVINGS, leave Account A as the source and click Open New Account.
   - Expected: "Account Opened!" and the new account number are displayed. This is Account B. Write down its number.
5. Click Accounts Overview.
   - Expected: Account A and Account B are listed. Write down both balances.

**Notes:**

- If the username already exists, log in with it. If the password does not work, use a new username (for example tf_tester03).
- ParaBank is a public demo and the database is reset from time to time. If the login fails, repeat the setup steps.
- Account numbers and balances are different every time, so they are written down during execution.
- Unless stated otherwise, transfers are made from Account A to Account B.

## TC-TF-01 - Transfer a valid amount

**Priority:** High  
**Type:** Positive  
**Test Data:** Amount = 10  
**Status:** Pass (automated in UI-03)

1. Log in and open Transfer Funds.
   - Expected: Transfer Funds page is displayed.
2. Enter 10 in the Amount field.
   - Expected: Amount field displays 10.
3. Select Account A as From and Account B as To.
   - Expected: Both accounts are selected correctly.
4. Click Transfer.
   - Expected: Transfer Complete message is displayed and confirms the $10 transfer.

## TC-TF-02 - Verify account balances after transfer

**Priority:** High  
**Type:** Positive  
**Test Data:** Amount = 10  
**Status:** Pass (automated in UI-03)

1. Note the balances of Account A and Account B.
   - Expected: Both initial balances are recorded.
2. Transfer $10 from Account A to Account B.
   - Expected: Transfer is completed successfully.
3. Open Accounts Overview.
   - Expected: Updated account balances are displayed.
4. Compare the balances before and after the transfer.
   - Expected: Account A decreases by $10 and Account B increases by $10.
5. Check the total balance.
   - Expected: Total balance remains unchanged.

## TC-TF-03 - Verify transfer in transaction history

**Priority:** High  
**Type:** Positive  
**Test Data:** Amount = 10  
**Status:** Not Run

1. Complete a $10 transfer from Account A to Account B.
   - Expected: Transfer is successful.
2. Open Accounts Overview and select Account A.
   - Expected: Account Activity page is displayed.
3. Check the transaction list.
   - Expected: An outgoing transfer of $10 is displayed.
4. Open Account B transaction history.
   - Expected: An incoming transfer of $10 is displayed.

## TC-TF-04 - Transfer a decimal amount

**Priority:** Medium  
**Type:** Positive  
**Test Data:** Amount = 10.55  
**Status:** Not Run

1. Open Transfer Funds.
   - Expected: Transfer form is displayed.
2. Enter 10.55 and select Account A and Account B.
   - Expected: Amount and accounts are selected correctly.
3. Click Transfer.
   - Expected: Transfer completes for $10.55.
4. Check the account balances.
   - Expected: Account A decreases by $10.55 and Account B increases by $10.55.

## TC-TF-05 - Transfer minimum amount

**Priority:** Medium  
**Type:** Boundary  
**Test Data:** Amount = 0.01  
**Status:** Not Run

1. Open Transfer Funds.
   - Expected: Transfer form is displayed.
2. Enter 0.01 and select Account A and Account B.
   - Expected: Amount and accounts are selected.
3. Click Transfer.
   - Expected: Transfer completes for $0.01.
4. Check both balances.
   - Expected: Balances are updated by $0.01.

## TC-TF-06 - Transfer full available balance

**Priority:** Medium  
**Type:** Boundary  
**Test Data:** Entire available balance of Account A  
**Status:** Not Run

1. Open Accounts Overview and note Account A balance.
   - Expected: Current balance is displayed.
2. Open Transfer Funds and enter the full balance of Account A.
   - Expected: Amount is entered correctly.
3. Select Account A and Account B, then click Transfer.
   - Expected: Transfer completes successfully.
4. Check the account balances.
   - Expected: Account A balance is $0.00 and Account B increases by the transferred amount.

## TC-TF-07 - Transfer more than available balance

**Priority:** High  
**Type:** Negative  
**Test Data:** Amount greater than Account A balance  
**Status:** Fail

1. Check the available balance of Account A.
   - Expected: Current balance is displayed.
2. Open Transfer Funds and enter an amount greater than the available balance.
   - Expected: Amount is entered.
3. Select Account A and Account B, then click Transfer.
   - Expected: Transfer is rejected with an insufficient funds message.
4. Check the account balances.
   - Expected: Balances remain unchanged.

**Actual Result:** Application accepts the transfer and displays Transfer Complete. Account A goes into a negative balance.

**Note:** This expected result assumes overdrafts are not allowed. The business rule should be confirmed.

## TC-TF-08 - Transfer zero amount

**Priority:** High  
**Type:** Boundary / Negative  
**Test Data:** Amount = 0  
**Status:** Not Run

1. Open Transfer Funds.
   - Expected: Transfer form is displayed.
2. Enter 0 and select Account A and Account B.
   - Expected: Amount and accounts are selected.
3. Click Transfer.
   - Expected: Transfer is rejected because the amount must be greater than zero.
4. Check the account balances.
   - Expected: No changes are made to either account.

## TC-TF-09 - Transfer negative amount

**Priority:** Critical  
**Type:** Negative  
**Test Data:** Amount = -100  
**Status:** Fail

1. Open Transfer Funds.
   - Expected: Transfer form is displayed.
2. Enter -100 and select Account A and Account B.
   - Expected: Amount and accounts are selected.
3. Click Transfer.
   - Expected: Transfer is rejected because negative amounts are not allowed.
4. Check the account balances.
   - Expected: Balances remain unchanged.

**Actual Result:** Application accepts the negative amount and displays a transfer confirmation. The money is moved the other way, $100 is taken from Account B and added to Account A.

**Related Bug:** [BUG-01](BUG_REPORTS.md)

## TC-TF-10 - Transfer with empty amount

**Priority:** Medium  
**Type:** Negative  
**Test Data:** Empty Amount field  
**Status:** Not Run

1. Open Transfer Funds.
   - Expected: Transfer form is displayed.
2. Leave Amount empty and select Account A and Account B.
   - Expected: Amount field remains empty.
3. Click Transfer.
   - Expected: Validation error is displayed and transfer is not completed.

## TC-TF-11 - Transfer non-numeric amount

**Priority:** Medium  
**Type:** Negative  
**Test Data:** abc, 10$  
**Status:** Not Run

1. Open Transfer Funds.
   - Expected: Transfer form is displayed.
2. Enter abc in Amount.
   - Expected: Value is entered or rejected by input validation.
3. Click Transfer if the value is accepted.
   - Expected: Invalid amount is rejected. No transfer is completed.
4. Repeat with 10$.
   - Expected: Invalid amount is rejected. No transfer is completed.

## TC-TF-12 - Transfer amount with more than two decimals

**Priority:** Low  
**Type:** Boundary  
**Test Data:** Amount = 10.999  
**Status:** Not Run

1. Open Transfer Funds.
   - Expected: Transfer form is displayed.
2. Enter 10.999 and select Account A and Account B.
   - Expected: Amount and accounts are selected.
3. Click Transfer.
   - Expected: Amount is rejected or handled according to the agreed currency precision rule.
4. Check the balances if the transfer is accepted.
   - Expected: Balance changes match the confirmed amount.

## TC-TF-13 - Transfer to the same account

**Priority:** High  
**Type:** Negative  
**Test Data:** Amount = 10, From = Account A, To = Account A  
**Status:** Fail

1. Open Transfer Funds.
   - Expected: Transfer form is displayed.
2. Enter 10 and select Account A in both dropdowns.
   - Expected: Same account is selected for From and To.
3. Click Transfer.
   - Expected: Transfer is rejected because source and destination accounts are the same.

**Actual Result:** Application displays Transfer Complete.

**Note:** This behavior was observed during exploratory testing. It should be confirmed whether same-account transfers are intentionally supported.

## TC-TF-14 - Verify available accounts in dropdowns

**Priority:** Medium  
**Type:** Positive  
**Status:** Not Run

1. Log in with a customer who has two accounts.
   - Expected: Customer is logged in.
2. Open Transfer Funds.
   - Expected: Transfer form is displayed.
3. Open From account dropdown.
   - Expected: Only the customer's own accounts are listed.
4. Open To account dropdown.
   - Expected: Only the customer's own accounts are listed.

## TC-TF-15 - Access Transfer Funds without login

**Priority:** High  
**Type:** Security  
**Status:** Not Run

1. Log out or open a new browser session without logging in.
   - Expected: Customer is not authenticated.
2. Navigate directly to the Transfer Funds URL.
   - Expected: Transfer form is not accessible without authentication.
3. Check the displayed page.
   - Expected: Login page or an appropriate access error is displayed.

The test cases cover valid transfers, balance updates, transaction history, boundary values, invalid inputs and access without authentication.
