import { test, expect } from '@playwright/test';

test.describe('QuizzesPage Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the QuizzesPage
    await page.goto('http://localhost:3000');
  });

  test('should display all quizzes initially', async ({ page }) => {
    // Verify that all quiz titles are visible
    const quizTitles = ['Chapter 1 Quiz', 'Chapter 2 Quiz', 'Chapter 3 Quiz', 'Chapter 4 Quiz'];
    for (const title of quizTitles) {
      await expect(page.locator(`text=${title}`)).toBeVisible();
    }
  });

  test('should search quizzes correctly', async ({ page }) => {
    // Type in the search input
    await page.fill('input[placeholder="Search..."]', 'Chapter 1');
    
    // Verify that only "Chapter 1 Quiz" is visible
    await expect(page.locator('text=Chapter 1 Quiz')).toBeVisible();
    await expect(page.locator('text=Chapter 2 Quiz')).not.toBeVisible();
    await expect(page.locator('text=Chapter 3 Quiz')).not.toBeVisible();
    await expect(page.locator('text=Chapter 4 Quiz')).not.toBeVisible();
  });

  test('should sort quizzes alphabetically when clicked', async ({ page }) => {
    // Click the sort button
    await page.click('button:text("☰⬇")');

    // Verify that the quizzes are sorted alphabetically by title
    const titles = await page.locator('.quiz-title').allTextContents();
    expect(titles).toEqual(['Chapter 1 Quiz', 'Chapter 2 Quiz', 'Chapter 3 Quiz', 'Chapter 4 Quiz']);
  });

  test('should show the delete confirmation dialog when the delete button is clicked', async ({ page }) => {
    // Open the options dialog for the first quiz
    await page.click('text=Chapter 1 Quiz >> .. >> button:text("...")');

    // Click the delete button to trigger the confirmation dialog
    await page.click('button:text("Delete")');

    // Verify that the confirmation dialog appears
    await expect(page.locator('text=Delete Quiz')).toBeVisible();
    await expect(page.locator('text=Are you sure you want to delete this quiz?')).toBeVisible();
  });

  test('should close the delete confirmation dialog when the cancel button is clicked', async ({ page }) => {
    // Open the options dialog for the first quiz
    await page.click('text=Chapter 1 Quiz >> .. >> button:text("...")');
    await page.click('button:text("Delete")');

    // Click the cancel button
    await page.click('button:text("Cancel")');

    // Verify the confirmation dialog is not visible
    await expect(page.locator('text=Delete Quiz')).not.toBeVisible();
  });

  test('should confirm deletion when the confirm button is clicked', async ({ page }) => {
    // Open the options dialog for the first quiz
    await page.click('text=Chapter 1 Quiz >> .. >> button:text("...")');
    await page.click('button:text("Delete")');

    // Click the confirm button
    await page.click('button:text("Confirm")');

    // Verify that the quiz is removed from the page
    await expect(page.locator('text=Chapter 1 Quiz')).not.toBeVisible();
  });

  // Test for multiple interactions with sorting, searching, and deleting
  test('should allow multiple operations on quizzes', async ({ page }) => {
    // Perform a search
    await page.fill('input[placeholder="Search..."]', 'Chapter 2');
    await expect(page.locator('text=Chapter 2 Quiz')).toBeVisible();

    // Clear the search input
    await page.fill('input[placeholder="Search..."]', '');
    await expect(page.locator('text=Chapter 1 Quiz')).toBeVisible();

    // Sort quizzes and verify the change
    await page.click('button:text("☰⬇")');
    const sortedTitles = await page.locator('.quiz-title').allTextContents();
    expect(sortedTitles).toEqual(['Chapter 1 Quiz', 'Chapter 2 Quiz', 'Chapter 3 Quiz', 'Chapter 4 Quiz']);

    // Delete a quiz and verify it's removed
    await page.click('text=Chapter 2 Quiz >> .. >> button:text("...")');
    await page.click('button:text("Delete")');
    await expect(page.locator('text=Chapter 2 Quiz')).not.toBeVisible();
  });
});
