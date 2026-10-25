import { Page, expect } from '@playwright/test';

export class AccountsPage {

  // CONSTRUCTOR
  constructor(private page: Page) {}

  // LOCATORS (initialized directly in the class)
  accountsLink = this.page.getByRole('link', { name: 'Accounts Overview' });
  overviewHeading = this.page.getByRole('heading', { name: 'Accounts Overview' });
  accountsTable = this.page.locator('#accountTable');
  firstAccountLink = this.page.locator('#accountTable tbody tr a').first();

  // METHODS
  async goto() {
    await this.accountsLink.click();
  }

  async expectOverview() {
    await expect(this.overviewHeading).toHaveText('Accounts Overview');
    await expect(this.accountsTable).toBeVisible();
  }

  async getFirstAccountId() {
    await expect(this.firstAccountLink).toBeVisible();
    return (await this.firstAccountLink.innerText()).trim();
  }

  // Reads the Balance column of the given account, e.g. "$415.50" -> 415.5
  async getBalance(accountId: string) {
    const row = this.accountsTable.locator('tbody tr').filter({
      has: this.page.getByRole('link', { name: accountId, exact: true }),
    });
    const balanceCell = row.locator('td').nth(1);
    await expect(balanceCell).toHaveText(/\$/);
    return Number((await balanceCell.innerText()).replace(/[$,]/g, ''));
  }
}
