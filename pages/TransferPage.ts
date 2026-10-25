import { Page, expect } from '@playwright/test';

export class TransferPage {

  // CONSTRUCTOR
  constructor(private page: Page) {}

  // LOCATORS (initialized directly in the class)
  transferLink = this.page.getByRole('link', { name: 'Transfer Funds' });
  amountInput = this.page.locator('#amount');
  fromAccountDropdown = this.page.locator('#fromAccountId');
  toAccountDropdown = this.page.locator('#toAccountId');
  transferButton = this.page.getByRole('button', { name: 'Transfer' });
  resultPanel = this.page.locator('#rightPanel');

  // METHODS
  async goto() {
    await this.transferLink.click();
    // The account dropdowns are loaded asynchronously.
    await expect(this.fromAccountDropdown.locator('option').first()).toBeAttached();
  }

  async transfer(amount: string, fromAccountId: string, toAccountId: string) {
    await this.amountInput.fill(amount);
    await this.fromAccountDropdown.selectOption(fromAccountId);
    await this.toAccountDropdown.selectOption(toAccountId);
    await this.transferButton.click();
  }

  async expectTransferComplete(amount: string, fromAccountId: string, toAccountId: string) {
    await expect(this.resultPanel).toContainText('Transfer Complete!');
    await expect(this.resultPanel).toContainText(
      `$${amount} has been transferred from account #${fromAccountId} to account #${toAccountId}`
    );
  }
}
