import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
    testDir: './tests',
    timeout: 90 * 1000,
    expect: { timeout: 5000 },
    reporter: 'html',
    use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        baseURL: 'https://test.salesforce.com',
        viewport: { width: 1440, height: 900 },
        ignoreHTTPSErrors: true
    }
});