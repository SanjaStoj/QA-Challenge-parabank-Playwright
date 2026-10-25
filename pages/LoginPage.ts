import { Page, expect } from '@playwright/test';

export class LoginPage {

  // CONSTRUCTOR
  constructor(private page: Page) {}

  // LOCATORS (initialized directly in the class)
  usernameInput = this.page.locator('input[name="username"]');
  passwordInput = this.page.locator('input[name="password"]');
  loginButton = this.page.locator('input[value="Log In"]');
  logoutLink = this.page.getByRole('link', { name: 'Log Out' });
  accountsPanel = this.page.locator('#rightPanel');

  // METHODS
  async goto() {
    await this.page.goto('index.htm');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoggedIn() {
    await expect(this.logoutLink).toBeVisible();
    await expect(this.accountsPanel).toContainText('Accounts Overview');
  }

  async logout() {
    await this.logoutLink.click();
  }
}
