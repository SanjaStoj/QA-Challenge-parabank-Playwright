import { Page, expect } from '@playwright/test';

export class OpenAccountPage {

  // CONSTRUCTOR
  constructor(private page: Page) {}

  // LOCATORS (initialized directly in the class)
  openAccountLink = this.page.getByRole('link', { name: 'Open New Account' });
  accountTypeDropdown = this.page.locator('#type');
  fromAccountOptions = this.page.locator('#fromAccountId option');
  openAccountButton = this.page.getByRole('button', { name: 'Open New Account' });
  resultPanel = this.page.locator('#rightPanel');
  newAccountIdLink = this.page.locator('#newAccountId');

  // METHODS
  async createSavingsAccount() {
    await this.openAccountLink.click();
    await this.accountTypeDropdown.selectOption({ label: 'SAVINGS' });
    await expect(this.fromAccountOptions.first()).toBeAttached();
    await this.openAccountButton.click();
    await expect(this.resultPanel).toContainText('Account Opened!');
    await expect(this.newAccountIdLink).toHaveText(/\d+/);
    return (await this.newAccountIdLink.innerText()).trim();
  }
}
