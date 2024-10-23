import { PlaywrightTestConfig } from '@playwright/test';

declare global {
  namespace PlaywrightTestConfig {
    interface UseOptions {
      loginAPIURL?: string;
    }
  }
}
