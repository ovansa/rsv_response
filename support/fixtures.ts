import { UserCredentials } from './types';
import { test as base } from '@playwright/test';

export const userCredentials: UserCredentials = {
  email: '<replace with a valid email>',
  password: '<replace with a valid password>',
};

export const test = base.extend<{
  userCredentials: UserCredentials;
}>({
  userCredentials: async ({}, use) => {
    // Use the fixture value in the test.
    await use(userCredentials);
  },
});

export { expect } from '@playwright/test';
