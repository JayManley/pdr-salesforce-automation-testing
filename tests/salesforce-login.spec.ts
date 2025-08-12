import { test, expect } from '@playwright/test';

test('Salesforce login', async ({ page }) => {
    // Go to Salesforce login page
    await page.goto('/');

    // Enter credentials
    await page.fill('input#username', process.env.SF_USERNAME || 'YOUR_USERNAME');
    await page.fill('input#password', process.env.SF_PASSWORD || 'YOUR_PASSWORD');

    // Click login
    await Promise.all([
        page.waitForNavigation(),
        page.click('input#Login')
    ]);

    // Verify we landed in Lightning
    await expect(page).toHaveURL(/lightning\.force\.com/);

    // Optional: take a screenshot of home page
    await page.screenshot({ path: 'sf-home.png' });

    await page.pause();
});