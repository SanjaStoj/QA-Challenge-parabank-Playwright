import { test } from '@playwright/test';
import { createTestUser } from '../../test-data/users';
import { RegisterPage } from '../../pages/RegisterPage';

test('UI-01: customer can register', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const user = createTestUser();

  await registerPage.goto();
  await registerPage.register(user);
  await registerPage.expectSuccess(user.username);
});
