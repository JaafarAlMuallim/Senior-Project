import { test, expect } from '@playwright/test';

test('navigate to admin monitor page', async ({ page }) => {
  await page.goto('http://localhost:3000/home');

    await page.click('text=Admin')

    await expect(page).toHaveURL('http://localhost:3000/admin')

    await expect(page.locator('Tabs')).toBeVisible()

    await expect(page.locator('UserTabContent')).toBeVisible()
});

test('Group tab', async ({ page }) => {
  await page.goto('http://localhost:3000/admin');

  await page.click('text=Groups')

  await expect(page.locator('GroupTabContent')).toBeVisible()
});

test('Report tab', async ({ page }) => {
    await page.goto('http://localhost:3000/admin');

    await page.click('text=Reports')

    await expect(page.locator('ReportTabContent')).toBeVisible()
});
