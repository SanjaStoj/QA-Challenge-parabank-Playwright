import { test } from '@playwright/test';
import { createTestUser } from '../../test-data/users';
import { RegisterPage } from '../../pages/RegisterPage';
import { LoginPage } from '../../pages/LoginPage';
import { AccountsPage } from '../../pages/AccountsPage';

test('UI-02: customer can log in and view accounts', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const accountsPage = new AccountsPage(page);
  const user = createTestUser();

  await registerPage.goto();
  await registerPage.register(user);
  await registerPage.expectSuccess(user.username);

  await loginPage.logout();
  await loginPage.login(user.username, user.password);
  await loginPage.expectLoggedIn();

  await accountsPage.goto();
  await accountsPage.expectOverview();
});
