import { Page, expect, test } from '@playwright/test';
import type { TestUser } from '../test-data/users';

export class RegisterPage {

  // CONSTRUCTOR
  constructor(private page: Page) {}

  // LOCATORS (initialized directly in the class)
  firstNameInput = this.page.locator('[name="customer.firstName"]');
  lastNameInput = this.page.locator('[name="customer.lastName"]');
  addressInput = this.page.locator('[name="customer.address.street"]');
  cityInput = this.page.locator('[name="customer.address.city"]');
  stateInput = this.page.locator('[name="customer.address.state"]');
  zipCodeInput = this.page.locator('[name="customer.address.zipCode"]');
  phoneInput = this.page.locator('[name="customer.phoneNumber"]');
  ssnInput = this.page.locator('[name="customer.ssn"]');
  usernameInput = this.page.locator('[name="customer.username"]');
  passwordInput = this.page.locator('[name="customer.password"]');
  confirmPasswordInput = this.page.locator('[name="repeatedPassword"]');
  registerButton = this.page.getByRole('button', { name: 'Register' });
  resultPanel = this.page.locator('#rightPanel');

  // METHODS
  async goto() {
    await this.page.goto('register.htm');
  }

  async register(user: TestUser) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.addressInput.fill(user.address);
    await this.cityInput.fill(user.city);
    await this.stateInput.fill(user.state);
    await this.zipCodeInput.fill(user.zipCode);
    await this.phoneInput.fill(user.phone);
    await this.ssnInput.fill(user.ssn);
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.password);
    await this.registerButton.click();

    
    // Shows the created username in the HTML report, so it is clear which user the test used.
   test.info().annotations.push({ type: 'Test user', description: `${user.username} / ${user.password}` });
  }

  async expectSuccess(username: string) {
    await expect(this.resultPanel).toContainText(`Welcome ${username}`);
    await expect(this.resultPanel).toContainText('Your account was created successfully');
  }
}
