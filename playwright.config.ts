import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4174',
    trace: 'on-first-retry',
    actionTimeout: 10000
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  webServer: {
    command:
      'npm run build:library:js && npm run build:library:css && npx serve . -l 4174',
    url: 'http://127.0.0.1:4174/e2e/index.html',
    reuseExistingServer: !process.env.CI,
    timeout: 180000
  }
})
