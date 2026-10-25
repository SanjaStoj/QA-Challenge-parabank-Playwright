import { test, expect } from '@playwright/test';
import { createTestUser } from '../../test-data/users';
import { RegisterPage } from '../../pages/RegisterPage';

test('API-01: login API returns registered customer details', async ({ page, request }) => {
  const user = createTestUser();
  const registerPage = new RegisterPage(page);

  // ParaBank has no REST endpoint for registration, so the user is created through the UI.
  await registerPage.goto();
  await registerPage.register(user);
  await registerPage.expectSuccess(user.username);

  const response = await request.get(
    `services/bank/login/${encodeURIComponent(user.username)}/${encodeURIComponent(user.password)}`,
    { headers: { Accept: 'application/json' } }
  );

  expect(response.status()).toBe(200);
  const customer = await response.json();
  expect(customer).toEqual(expect.objectContaining({
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phone,
    ssn: user.ssn,
  }));
  expect(customer.id).toEqual(expect.any(Number));
});
