import { test, expect } from '@playwright/test';
import { createTestUser } from '../../test-data/users';
import { RegisterPage } from '../../pages/RegisterPage';
import { AccountsPage } from '../../pages/AccountsPage';
import { OpenAccountPage } from '../../pages/OpenAccountPage';
import { TransferPage } from '../../pages/TransferPage';

test('UI-03: customer can transfer funds between own accounts', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const accountsPage = new AccountsPage(page);
  const openAccountPage = new OpenAccountPage(page);
  const transferPage = new TransferPage(page);
  const user = createTestUser();
  const amount = '10.00';

  await registerPage.goto();
  await registerPage.register(user);
  await registerPage.expectSuccess(user.username);

  await accountsPage.goto();
  const fromAccount = await accountsPage.getFirstAccountId();
  const toAccount = await openAccountPage.createSavingsAccount();

  await accountsPage.goto();
  const fromBalanceBefore = await accountsPage.getBalance(fromAccount);
  const toBalanceBefore = await accountsPage.getBalance(toAccount);

  await transferPage.goto();
  await transferPage.transfer(amount, fromAccount, toAccount);
  await transferPage.expectTransferComplete(amount, fromAccount, toAccount);

  await accountsPage.goto();
  expect(await accountsPage.getBalance(fromAccount)).toBeCloseTo(fromBalanceBefore - Number(amount), 2);
  expect(await accountsPage.getBalance(toAccount)).toBeCloseTo(toBalanceBefore + Number(amount), 2);
});
