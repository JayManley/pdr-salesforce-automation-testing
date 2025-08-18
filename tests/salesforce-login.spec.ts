import { test, expect } from '@playwright/test';
import { selectLWCComboBox } from './helpers/ui';

test('Salesforce login', async ({ page }) => {
    // Go to Salesforce login page
    await page.goto('/');

    // Enter credentials
    await page.fill('input#username', process.env.SF_USERNAME || 'YOUR_USERNAME');
    await page.fill('input#password', process.env.SF_PASSWORD || 'YOUR_PASSWORD');

    // Click login
    await Promise.all([
        page.waitForLoadState(),
        page.click('input#Login')
    ]);

    // Verify we landed in Lightning
    await expect(page).toHaveURL(/lightning\.force\.com/);

    // Optional: take a screenshot of home page
    // await page.screenshot({ path: 'sf-home.png' });

    // Wait for the App Launcher button to appear (Salesforce often uses a waffle icon)
    const appLauncher = page.getByRole('button', { name: 'App Launcher' });
    await appLauncher.waitFor({ state: 'visible' });
    await appLauncher.click();

    // Wait for App Launcher modal and search box
    const searchBox = page.locator('input[placeholder="Search apps and items..."]');
    await searchBox.waitFor({ state: 'visible' });
    await searchBox.fill('Leads');

    // Wait for search results to show "Leads" and click it
    const leadsOption = page.locator('one-app-launcher-menu-item a', { hasText: 'Leads' });
    await leadsOption.waitFor({ state: 'visible' });
    await leadsOption.click();

    const newLeadButton = page.getByRole('button', { name: 'New' });
    await newLeadButton.waitFor({ state: 'visible' });
    await newLeadButton.click();

    await page.waitForLoadState();

    await page.getByRole('textbox', { name: 'First Name' }).fill('Joe');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Bloggs');
    await page.getByRole('textbox', { name: 'Email' }).fill('joe.bloggs@pdr.test.com.invalid');
    await page.getByRole('textbox', { name: 'Mobile' }).fill('07123456789');

    await selectLWCComboBox(page, 'Lead Source', 'Web');
    await selectLWCComboBox(page, 'Lead source - Level', 'Level 1');
    await selectLWCComboBox(page, 'Enquiry Method', 'Phone');

    await page.pause();
});