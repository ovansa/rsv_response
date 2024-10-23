import { LoginError } from '../support/types';
import { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import selectors from '../support/selectors';

const LOGIN_API_URL = 'https://app.rise.capital/api/v2/auth/login';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async watchLoginAPIRequest() {
    await this.page.route(LOGIN_API_URL, (route) => route.continue());
  }

  async enterEmailAndPasswordAndSubmit({
    email,
    password,
  }: {
    email?: string;
    password?: string;
  }) {
    if (email) {
      await this.page.fill(`#${selectors.login.emailFieldId}`, email);
    }
    if (password) {
      await this.page.fill(`#${selectors.login.passwordFieldId}`, password);
    }
    await this.page.click(
      `button:has-text("${selectors.login.loginButtonText}")`
    );
  }

  async waitForLoginAPIResponse() {
    await this.page.waitForResponse(LOGIN_API_URL);
  }

  async verifyLoginErrorMessageIsDisplayed(message: LoginError) {
    await expect(this.page.locator(`text=${message}`)).toBeVisible();
  }
}
