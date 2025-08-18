// helpers/ui.ts
import { Page, expect } from '@playwright/test';

export async function selectLWCComboBox(
    page: Page,
    label: string,
    optionText: string,
    exact = true
) {
    // 1) Find the LWC combobox button (role=combobox)
    const combo = page.getByRole('combobox', { name: label, exact });
    await expect(combo).toBeVisible();

    // Make sure it's in view and open it
    await combo.scrollIntoViewIfNeeded();
    if ((await combo.getAttribute('aria-expanded')) !== 'true') {
        await combo.click();
    }

    // 2) Get the dropdown listbox by aria-controls
    const listboxId = await combo.getAttribute('aria-controls');
    const listbox = (
        listboxId
        ? page.locator(`#${listboxId}`)
        : page.getByRole('listbox')
    ); // fallback
    await listbox.waitFor({ state: 'visible' });

    // 3) Click the desired option
    const opt = listbox.getByRole('option', { name: optionText, exact });
    await expect(opt).toBeVisible();
    await opt.click();

    // Optional: assert it’s selected
    await expect(combo).toHaveAttribute('data-value', new RegExp(`${optionText}|^((?!None).)*$`));
}