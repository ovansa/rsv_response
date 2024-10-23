import { UserCredentials } from './types';
import { test as base } from '@playwright/test';

export const userCredentials: UserCredentials = {
  email: 'aminmuhammad18@gmail.com',
  password: '20A12m31in$',
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
