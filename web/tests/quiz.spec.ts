import { test, expect } from '@playwright/test';

test.describe('Quiz Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the Quiz page
    await page.goto('http://localhost:3000');
  });

  test('should display the first question and options', async ({ page }) => {
    // Verify that the first question is visible
    await expect(page.locator('text=What is the capital of France?')).toBeVisible();

    // Verify the options for the first question are visible
    const options = ['Paris', 'London', 'Berlin', 'Madrid'];
    for (const option of options) {
      await expect(page.locator(`text=${option}`)).toBeVisible();
    }
  });

  test('should navigate to the next question when "Next" is clicked after selecting an option', async ({ page }) => {
    // Select an option for the current question
    await page.click('text=Paris');
    await page.click('button:text("Next")');

      // Wait for and verify that the second question is visible      
      await expect(page.locator('text=What is 2 + 2?')).toBeVisible();
  });

  test('should not navigate to the next question if no option is selected', async ({ page }) => {
    // Verify that the "Next" button is disabled initially
    // await expect(page.locator('button:text("Next")')).toBeDisabled();
  
    // // Wait for the button to be in a disabled state before clicking
    // await page.waitForSelector('button:text("Next")');
  
    // Try to click the "Next" button without selecting an option
    await page.click('button:text("Next")');
  
    // Wait for and verify that the current question is still displayed
    await page.waitForSelector('text=What is the capital of France?');
    await expect(page.locator('text=What is the capital of France?')).toBeVisible();
  });
  

  test('should display the final screen with the score after answering all questions', async ({ page }) => {
    // Answer the first question and click "Next"
    await page.click('text=Paris');
    await page.click('button:text("Next")');

    // Answer the second question and click "Next"
    await page.click('text=4');
    await page.click('button:text("Next")');

    // Answer the third question and click "Submit"
    await page.click('text=Mars');
    await page.click('button:text("Submit")');

    // Wait for the quiz completion screen to appear
    await page.waitForSelector('text=Quiz Completed!');

    // Verify the final screen with the score is displayed
    await expect(page.locator('text=Quiz Completed!')).toBeVisible();
    await expect(page.locator('text=Your score: 3 out of 3')).toBeVisible();
  });

  test('should display the correct answers and user responses after quiz completion', async ({ page }) => {
    // Select an option for each question to complete the quiz
    await page.click('text=Paris'); // First question option
    await page.click('button:text("Next")');
  
    await page.click('text=4'); // Second question option
    await page.click('button:text("Next")');
  
    await page.click('text=Mars'); // Third question option
    await page.click('button:text("Submit")');
  
    // Wait for the quiz completion screen to appear
    await page.waitForSelector('text=Quiz Completed!');
  
    // Verify that the quiz completion screen is displayed
    await expect(page.locator('text=Quiz Completed!')).toBeVisible();
    
    // Verify that each question and the user's answers are displayed along with the correct answers
    await expect(page.locator('text=What is the capital of France?')).toBeVisible();
    await expect(page.locator('text=Paris Correct Correct Answer')).toBeVisible();
    await expect(page.locator('text=London')).toBeVisible();
    await expect(page.locator('text=Berlin')).toBeVisible();
    await expect(page.locator('text=Madrid')).toBeVisible();
  
    await expect(page.locator('text=What is 2 + 2?')).toBeVisible();
    await expect(page.locator('text=4 Correct Answer')).toBeVisible();
    await expect(page.locator('text=3 Incorrect')).toBeVisible();
    await expect(page.locator('text=5')).toBeVisible();
    await expect(page.locator('text=6')).toBeVisible();
  
    await expect(page.locator('text=Which planet is known as the Red Planet?')).toBeVisible();
    await expect(page.locator('text=Mars Correct Answer')).toBeVisible();
    await expect(page.locator('text=Earth')).toBeVisible();
    await expect(page.locator('text=Jupiter Incorrect')).toBeVisible();
    await expect(page.locator('text=Saturn')).toBeVisible();
  });
  

  test('should show the "Re-Take Quiz" and "Return to Quizzes" buttons on completion', async ({ page }) => {
    // Complete the quiz to reach the final screen
    await page.click('text=Paris');
    await page.click('button:text("Next")');
    await page.click('text=4');
    await page.click('button:text("Next")');
    await page.click('text=Mars');
    await page.click('button:text("Submit")');

    // Verify that the "Re-Take Quiz" and "Return to Quizzes" buttons are visible
    await expect(page.locator('button:text("Re-Take Quiz")')).toBeVisible();
    await expect(page.locator('button:text("Return to Quizzes")')).toBeVisible();
  });

  test('should reset the quiz when "Re-Take Quiz" is clicked', async ({ page }) => {
    // Complete the quiz to reach the final screen
    await page.click('text=Paris');
    await page.click('button:text("Next")');
    await page.click('text=4');
    await page.click('button:text("Next")');
    await page.click('text=Mars');
    await page.click('button:text("Submit")');

    // Click "Re-Take Quiz"
    await page.click('button:text("Re-Take Quiz")');

    // Wait for the first question to appear again
    await page.waitForSelector('text=What is the capital of France?');

    // Verify that the first question is visible again
    await expect(page.locator('text=What is the capital of France?')).toBeVisible();
  });

  test('should return to the course list when "Return to Quizzes" is clicked', async ({ page }) => {
    // Complete the quiz to reach the final screen
    await page.click('text=Paris');
    await page.click('button:text("Next")');
    await page.click('text=4');
    await page.click('button:text("Next")');
    await page.click('text=Mars');
    await page.click('button:text("Submit")');

    // Click "Return to Quizzes"
    await page.click('button:text("Return to Quizzes")');

    // Wait for the quizzes list to be visible again
    await page.waitForSelector('text=Quizzes');

    // Verify that the page has navigated back to the quizzes list
    await expect(page.locator('text=Quizzes')).toBeVisible();
  });
});
