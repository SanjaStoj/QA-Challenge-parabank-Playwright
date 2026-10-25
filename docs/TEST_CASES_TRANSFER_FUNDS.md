<!-- To open this file in preview mode, press Ctrl+Shift+V (or Ctrl+K V to open the preview on the side). -->

# Manual Test Cases - Transfer Funds

**Application:** ParaBank  
**Feature:** Transfer Funds  
**Environment URL:** https://parabank.parasoft.com/parabank/  
**Browser:** Chrome  
**Test type:** Functional, Boundary, Negative and Security Testing  
**Last executed:** 25-10-2026

## Preconditions

All test cases use one customer with two accounts.
Account A and Account B belong to the same customer, so there is one username and one password.

ParaBank has no written specification. Expected results for valid transfers were confirmed by running them.
Expected results for invalid input (zero, negative, overdraft, same account, invalid text) follow standard banking rules
and should be confirmed with the Product Owner.

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

**Note:** The public ParaBank database is shared and reset from time to time. If "This username already exists." is displayed, use a different username.

### Setup steps

1. Open https://parabank.parasoft.com/parabank/register.htm
   - Expected: The heading "Signing up is easy!" and a form with the fields First Name, Last Name, Address, City, State, Zip Code, Phone #, SSN, Username, Password and Confirm are displayed.
2. Fill in all fields with the test user data above and click Register.
   - Expected: "Welcome tf_tester02" and "Your account was created successfully. You are now logged in." are displayed. The left menu shows "Welcome Transfer Tester" and the Log Out link.
3. Click Accounts Overview.
   - Expected: One account is listed with Balance $500.00 and Available Amount $500.00. Total is $500.00. This is Account A. Write down its number.
4. Click Open New Account, select SAVINGS, leave Account A as the source and click Open New Account.
   - Expected: "Account Opened!", "Congratulations, your account is now open." and "Your new account number: {number}" are displayed. This is Account B. Write down its number.
5. Click Accounts Overview.
   - Expected: Account A shows $400.00 and Account B shows $100.00 ($100.00 is the minimum opening deposit taken from Account A). Total is still $500.00.

### General expected results

These apply to every test case below and are not repeated in each step.

- **Successful transfer:** The message "Transfer Complete!" and "${amount with two decimals} has been transferred from account #{A} to account #{B}." are displayed, for example "$10.00 has been transferred from account #13344 to account #13455.".
  Account A decreases by the amount and Account B increases by the same amount. The Total in Accounts Overview does not change.
- **Rejected transfer:** An error message that explains the problem is displayed next to the form. "Transfer Complete!" is **not** displayed. The balances of both accounts stay the same.
- **Transfer Funds page:** The heading "Transfer Funds", the Amount field, the "From account #" dropdown, the "to account #" dropdown and the Transfer button are displayed. Both dropdowns list Account A and Account B. Both dropdowns select Account A by default.

## TC-TF-01 - Transfer a valid amount

**Priority:** High  
**Type:** Positive  
**Test Data:** Amount = 10  
**Status:** Pass (automated in UI-03)

1. Log in and click Transfer Funds.
   - Expected: The Transfer Funds page is displayed (see General expected results).
2. Enter 10 in the Amount field.
   - Expected: The Amount field shows 10.
3. Select Account A in "From account #" and Account B in "to account #".
   - Expected: The dropdowns show Account A and Account B.
4. Click Transfer.
   - Expected: "Transfer Complete!" and "$10.00 has been transferred from account #{A} to account #{B}." are displayed.

## TC-TF-02 - Verify account balances after transfer

**Priority:** High  
**Type:** Positive  
**Test Data:** Amount = 10  
**Status:** Pass (automated in UI-03)

1. Click Accounts Overview and write down the balances of Account A and Account B.
   - Expected: Both balances are displayed. After setup: A = $400.00, B = $100.00, Total = $500.00.
2. Transfer $10 from Account A to Account B.
   - Expected: "$10.00 has been transferred from account #{A} to account #{B}." is displayed.
3. Click Accounts Overview.
   - Expected: Account A shows its previous balance minus $10.00 (after setup: $390.00). Account B shows its previous balance plus $10.00 (after setup: $110.00).
4. Check the Total row.
   - Expected: The Total is the same as before the transfer (after setup: $500.00).

## TC-TF-03 - Verify transfer in transaction history

**Priority:** High  
**Type:** Positive  
**Test Data:** Amount = 10  
**Status:** Pass

1. Transfer $10 from Account A to Account B.
   - Expected: "$10.00 has been transferred from account #{A} to account #{B}." is displayed.
2. Click Accounts Overview and click the number of Account A.
   - Expected: The Account Details page shows Account Number {A}, Account Type CHECKING and the current Balance. The Account Activity table is displayed below.
3. Check the Account Activity table of Account A.
   - Expected: A row with today's date, Transaction "Funds Transfer Sent" and $10.00 in the Debit (-) column is displayed.
4. Open Account Activity of Account B.
   - Expected: A row with today's date, Transaction "Funds Transfer Received" and $10.00 in the Credit (+) column is displayed.
5. Click "Funds Transfer Received" in Account B.
   - Expected: The Transaction Details page shows Description "Funds Transfer Received", Type "Credit" and Amount "$10.00".

**Note:** Both accounts also show the $100.00 opening deposit from setup ("Funds Transfer Sent" in A, "Funds Transfer Received" in B).

## TC-TF-04 - Transfer a decimal amount

**Priority:** Medium  
**Type:** Positive  
**Test Data:** Amount = 10.55  
**Status:** Pass

1. Click Transfer Funds.
   - Expected: The Transfer Funds page is displayed.
2. Enter 10.55, select Account A as From and Account B as To.
   - Expected: The Amount field shows 10.55 and the dropdowns show Account A and Account B.
3. Click Transfer.
   - Expected: "$10.55 has been transferred from account #{A} to account #{B}." is displayed.
4. Click Accounts Overview.
   - Expected: Account A decreased by exactly $10.55 and Account B increased by exactly $10.55. The Total did not change.

## TC-TF-05 - Transfer minimum amount

**Priority:** Medium  
**Type:** Boundary  
**Test Data:** Amount = 0.01  
**Status:** Pass

1. Click Transfer Funds.
   - Expected: The Transfer Funds page is displayed.
2. Enter 0.01, select Account A as From and Account B as To.
   - Expected: The Amount field shows 0.01 and the dropdowns show Account A and Account B.
3. Click Transfer.
   - Expected: "$0.01 has been transferred from account #{A} to account #{B}." is displayed.
4. Click Accounts Overview.
   - Expected: Account A decreased by $0.01 and Account B increased by $0.01. The Total did not change.

## TC-TF-06 - Transfer full available balance

**Priority:** Medium  
**Type:** Boundary  
**Test Data:** Entire available balance of Account A  
**Status:** Pass

1. Click Accounts Overview and write down the Available Amount of Account A.
   - Expected: The Available Amount is displayed (after setup: $400.00).
2. Click Transfer Funds and enter the full Available Amount of Account A (for example 400).
   - Expected: The Amount field shows the entered value.
3. Select Account A as From and Account B as To, then click Transfer.
   - Expected: "$400.00 has been transferred from account #{A} to account #{B}." is displayed (the full amount from step 1).
4. Click Accounts Overview.
   - Expected: Account A shows $0.00. Account B increased by the transferred amount (after setup: $500.00). The Total did not change.

## TC-TF-07 - Transfer more than available balance

**Priority:** High  
**Type:** Negative  
**Test Data:** Amount = 1000000 (greater than the balance of Account A)  
**Status:** Fail

1. Click Accounts Overview and write down the balance of Account A.
   - Expected: The balance is displayed.
2. Click Transfer Funds and enter 1000000.
   - Expected: The Amount field shows 1000000.
3. Select Account A as From and Account B as To, then click Transfer.
   - Expected: The transfer is rejected with an insufficient funds message. "Transfer Complete!" is not displayed.
4. Click Accounts Overview.
   - Expected: The balances of Account A and Account B are the same as in step 1.

**Actual Result:** "Transfer Complete! $1000000.00 has been transferred..." is displayed. Account A goes from $0.00 to -$1,000,000.00 and Account B increases by $1,000,000.00.

**Note:** This expected result assumes overdrafts are not allowed. The business rule should be confirmed.

## TC-TF-08 - Transfer zero amount

**Priority:** High  
**Type:** Boundary / Negative  
**Test Data:** Amount = 0  
**Status:** Fail

1. Click Transfer Funds.
   - Expected: The Transfer Funds page is displayed.
2. Enter 0, select Account A as From and Account B as To.
   - Expected: The Amount field shows 0.
3. Click Transfer.
   - Expected: The transfer is rejected with a message that the amount must be greater than zero. "Transfer Complete!" is not displayed.
4. Click Accounts Overview and open Account Activity of Account A.
   - Expected: The balances did not change and no new transaction is listed.

**Actual Result:** "Transfer Complete! $0.00 has been transferred from account #{A} to account #{B}." is displayed. The balances do not change.

**Related Bug:** Not reported (two-bug limit), listed under Other findings in the README.

## TC-TF-09 - Transfer negative amount

**Priority:** Critical  
**Type:** Negative  
**Test Data:** Amount = -100  
**Status:** Fail

1. Click Transfer Funds.
   - Expected: The Transfer Funds page is displayed.
2. Enter -100, select Account A as From and Account B as To.
   - Expected: The Amount field shows -100.
3. Click Transfer.
   - Expected: The transfer is rejected with a message that the amount must be greater than zero. "Transfer Complete!" is not displayed.
4. Click Accounts Overview.
   - Expected: The balances of Account A and Account B did not change.

**Actual Result:** "Transfer Complete! -$100.00 has been transferred from account #{A} to account #{B}." is displayed. The money is moved the other way, $100 is taken from Account B and added to Account A.

**Related Bug:** [BUG-01](BUG_REPORTS.md)

## TC-TF-10 - Transfer with empty amount

**Priority:** Medium  
**Type:** Negative  
**Test Data:** Empty Amount field  
**Status:** Fail

1. Click Transfer Funds.
   - Expected: The Transfer Funds page is displayed.
2. Leave Amount empty, select Account A as From and Account B as To.
   - Expected: The Amount field is empty.
3. Click Transfer.
   - Expected: A validation message such as "The amount cannot be empty." is displayed next to the Amount field. "Transfer Complete!" is not displayed.
4. Click Accounts Overview.
   - Expected: The balances did not change.

**Actual Result:** No transfer is made and the balances do not change, but instead of a validation message the generic message "Error! An internal error has occurred and has been logged." is displayed.

**Related Bug:** Not reported (two-bug limit), listed under Other findings in the README.

## TC-TF-11 - Transfer non-numeric amount

**Priority:** Medium  
**Type:** Negative  
**Test Data:** abc, 10$  
**Status:** Fail

1. Click Transfer Funds.
   - Expected: The Transfer Funds page is displayed.
2. Enter abc in Amount, select Account A as From and Account B as To.
   - Expected: The Amount field shows abc (the field is a text field and accepts any characters).
3. Click Transfer.
   - Expected: A validation message such as "Please enter a valid amount." is displayed. "Transfer Complete!" is not displayed and the balances do not change.
4. Repeat steps 2 and 3 with 10$.
   - Expected: The same validation message is displayed. "Transfer Complete!" is not displayed and the balances do not change.

**Actual Result:** For both values no transfer is made and the balances do not change, but the generic message "Error! An internal error has occurred and has been logged." is displayed instead of a validation message.

**Related Bug:** Not reported (two-bug limit), listed under Other findings in the README.

## TC-TF-12 - Transfer amount with more than two decimals

**Priority:** High  
**Type:** Boundary  
**Test Data:** Amount = 10.999  
**Status:** Fail

1. Click Transfer Funds.
   - Expected: The Transfer Funds page is displayed.
2. Enter 10.999, select Account A as From and Account B as To.
   - Expected: The Amount field shows 10.999.
3. Click Transfer.
   - Expected: The transfer is rejected with a message that the amount can have at most two decimals. "Transfer Complete!" is not displayed.
4. Click Accounts Overview.
   - Expected: The Accounts Overview table is displayed and the balances did not change.
5. Click Transfer Funds.
   - Expected: The Transfer Funds page is displayed and both dropdowns list Account A and Account B.

**Actual Result:** "Transfer Complete! $11.00 has been transferred from account #{A} to account #{B}." is displayed (the amount is rounded). After that, Accounts Overview and Transfer Funds only show "Error! An internal error has occurred and has been logged." and the dropdowns are empty. The customer can no longer see or use their accounts. Reproduced 3 out of 3 times with new users.

**Related Bug:** Not reported (two-bug limit), listed under Other findings in the README.

## TC-TF-13 - Transfer to the same account

**Priority:** High  
**Type:** Negative  
**Test Data:** Amount = 10, From = Account A, To = Account A  
**Status:** Fail

1. Click Transfer Funds.
   - Expected: The Transfer Funds page is displayed. Both dropdowns select Account A by default.
2. Enter 10 and select Account A in both dropdowns.
   - Expected: Account A is selected in "From account #" and in "to account #".
3. Click Transfer.
   - Expected: The transfer is rejected with a message that the From and To accounts must be different. "Transfer Complete!" is not displayed.
4. Click Accounts Overview and open Account Activity of Account A.
   - Expected: The balance did not change and no new transaction is listed.

**Actual Result:** "Transfer Complete! $10.00 has been transferred from account #{A} to account #{A}." is displayed. The balance does not change.

**Note:** Same-account transfers may be intentionally supported. The business rule should be confirmed. Because both dropdowns select Account A by default, a customer can make this transfer by mistake.

## TC-TF-14 - Verify available accounts in dropdowns

**Priority:** Medium  
**Type:** Positive  
**Status:** Pass

1. Log in with the test user (two accounts).
   - Expected: The left menu shows "Welcome Transfer Tester" and the Accounts Overview page lists Account A and Account B.
2. Click Transfer Funds.
   - Expected: The Transfer Funds page is displayed.
3. Open the "From account #" dropdown.
   - Expected: Exactly two options are listed: Account A and Account B. No accounts of other customers are listed.
4. Open the "to account #" dropdown.
   - Expected: Exactly two options are listed: Account A and Account B. No accounts of other customers are listed.

## TC-TF-15 - Access Transfer Funds without login

**Priority:** High  
**Type:** Security  
**Status:** Fail (low impact)

1. Open a new private browser window, or click Log Out.
   - Expected: The left panel shows the Customer Login form (Username, Password, Log In). The Log Out link is not displayed.
2. Navigate directly to https://parabank.parasoft.com/parabank/transfer.htm
   - Expected: The Transfer Funds form (Amount field, account dropdowns, Transfer button) is not displayed.
3. Check the displayed page.
   - Expected: The Customer Login form is displayed together with a message asking the user to log in.

**Actual Result:** The transfer form is not displayed and the Customer Login form is displayed, so the page is protected. However, the message is the generic "Error! An internal error has occurred and has been logged." instead of a message asking the user to log in.

**Related Bug:** Not reported (two-bug limit), listed under Other findings in the README.

## Summary

- **Pass (7):** TC-TF-01, 02, 03, 04, 05, 06, 14
- **Fail (8):** TC-TF-07, 08, 09, 10, 11, 12, 13, 15

The test cases cover valid transfers, balance updates, transaction history, boundary values, invalid inputs and access without authentication.
