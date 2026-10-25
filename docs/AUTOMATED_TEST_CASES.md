<!-- To open this file in preview mode, press Ctrl+Shift+V (or Ctrl+K V to open the preview on the side). -->

# Automated Test Cases

**Application:** ParaBank  
**Environment URL:** https://parabank.parasoft.com/parabank/  
**Tools:** Playwright, TypeScript

Every test registers a new user with a generated username and password, so the tests are independent and can run in parallel.

- UI-01 - Customer can register - `tests/ui/registration.spec.ts`
- UI-02 - Customer can log in and view accounts - `tests/ui/login.spec.ts`
- UI-03 - Customer can transfer funds between own accounts - `tests/ui/transfer.spec.ts`
- API-01 - Login API returns customer details - `tests/api/customer.spec.ts`

## UI-01 - Customer can register

**Preconditions:** ParaBank is accessible. A unique username is generated.

1. Open the Register page.
   - Expected: Signing up form is displayed.
2. Fill in all fields with valid data and a unique username and password.
   - Expected: All fields are filled and both passwords match.
3. Click Register.
   - Expected: "Welcome {username}" and "Your account was created successfully" are displayed.

## UI-02 - Customer can log in and view accounts

**Preconditions:** ParaBank is accessible. A unique username is generated.

1. Register a new user (same as UI-01).
   - Expected: The user is registered and logged in.
2. Click Log Out.
   - Expected: The login form is displayed.
3. Enter the same username and password and click Log In.
   - Expected: The user is logged in and the Log Out link is visible.
4. Open Accounts Overview.
   - Expected: Accounts Overview page and the accounts table are displayed.

## UI-03 - Customer can transfer funds between own accounts

**Preconditions:** ParaBank is accessible. A unique username is generated.

1. Register a new user (same as UI-01).
   - Expected: The user is registered and logged in. The user has one CHECKING account (Account A).
2. Open Accounts Overview.
   - Expected: Account A is listed. Write down its number.
3. Open a new SAVINGS account from Account A.
   - Expected: "Account Opened!" and the new account number are displayed. This is Account B.
4. Open Accounts Overview.
   - Expected: Account A and Account B are listed. Write down both balances.
5. Open Transfer Funds and enter 10.00 in the Amount field.
   - Expected: Amount field displays 10.00.
6. Select Account A as From and Account B as To.
   - Expected: Both accounts are selected correctly.
7. Click Transfer.
   - Expected: "Transfer Complete!" is displayed and confirms $10.00 from Account A to Account B.
8. Open Accounts Overview and compare the balances.
   - Expected: Account A is $10.00 lower and Account B is $10.00 higher.

## API-01 - Login API returns customer details

**Preconditions:** ParaBank is accessible. A unique username is generated. ParaBank has no API for registration, so the user is registered through the UI.

**Request:**

- Method - `GET`
- Endpoint - `services/bank/login/{username}/{password}`
- Header - `Accept: application/json`
- Body - None

**Expected response:**

- Status code - `200`
- `id` - A number
- `firstName` - Registered first name
- `lastName` - Registered last name
- `phoneNumber` - Registered phone number
- `ssn` - Registered SSN

1. Register a new user through the UI (same as UI-01).
   - Expected: The user is registered. Username, password and customer data are saved.
2. Send `GET services/bank/login/{username}/{password}` with header `Accept: application/json`.
   - Expected: Status code is 200 and the response is JSON.
3. Check `firstName`, `lastName`, `phoneNumber` and `ssn` in the response.
   - Expected: All values match the registered user.
4. Check `id` in the response.
   - Expected: `id` is a number.
