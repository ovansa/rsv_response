import { expect, test, userCredentials } from '../support/fixtures';

import { LoginError } from '../support/types';
import { LoginPage } from '../page_objects/loginPage';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('/');
  });

  test.describe('Successful Login', () => {
    test('should allow a valid user to login and redirect to the home page', async ({
      userCredentials,
      page,
    }) => {
      await loginPage.watchLoginAPIRequest();
      await loginPage.enterEmailAndPasswordAndSubmit(userCredentials);

      await loginPage.waitForLoginAPIResponse();
      await expect(page.locator('text=Refer & earn!')).toBeVisible();
    });
  });

  test.describe('Unsuccessful Login', () => {
    test('should display an error for invalid email or password', async ({
      page,
    }) => {
      await loginPage.watchLoginAPIRequest();

      await loginPage.enterEmailAndPasswordAndSubmit({
        email: userCredentials.email,
        password: 'invalidPassword',
      });
      await loginPage.waitForLoginAPIResponse();

      await loginPage.verifyLoginErrorMessageIsDisplayed(
        LoginError.InvalidCredentials
      );
    });

    test('should display an error when login without a password', async ({
      page,
    }) => {
      await loginPage.enterEmailAndPasswordAndSubmit({
        email: userCredentials.email,
      });
      await loginPage.verifyLoginErrorMessageIsDisplayed(
        LoginError.MissingPasswordField
      );
    });

    test('should display an error when login without an email', async ({
      page,
    }) => {
      await loginPage.enterEmailAndPasswordAndSubmit({ password: 'password' });
      await loginPage.verifyLoginErrorMessageIsDisplayed(
        LoginError.MissingEmailField
      );
    });
  });
});
