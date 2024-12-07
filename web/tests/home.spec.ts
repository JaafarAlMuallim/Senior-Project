import { test, expect } from "@playwright/test";

test.describe("HomePage Component", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the Home page
    await page.goto("http://localhost:3000/home");
  });

  // Test for initial rendering
  test("should display My Courses section and schedule", async ({ page }) => {
    // Verify that "My Courses" section is visible
    await expect(page.locator("text=My Courses")).toBeVisible();

    // Verify that the Schedule section is visible
    await expect(page.locator("text=Schedule")).toBeVisible();
  });

  // Test for displaying courses
  test("should display all courses in My Courses section", async ({ page }) => {
    // Check that at least one course card is displayed
    await expect(page.locator('[data-testid="course-card"]')).toHaveCount(1);
  });

  // Test for tutors
  test("should display Tutoring Sessions and Pending Requests sections for tutors", async ({
    page,
  }) => {
    // Mock the user as a tutor (you may need to adjust this for your test setup)
    const isTutor = true; // Replace this with your actual mock logic if necessary

    if (isTutor) {
      await expect(page.locator("text=Tutoring Sessions")).toBeVisible();
      await expect(page.locator("text=Pending Requests")).toBeVisible();
    } else {
      await expect(page.locator("text=Tutoring Sessions")).not.toBeVisible();
      await expect(page.locator("text=Pending Requests")).not.toBeVisible();
    }
  });

  // Test for pending requests
  test('should show "No Pending Requests" message if there are no pending requests', async ({
    page,
  }) => {
    // Check for the "No Pending Requests" message
    await expect(page.locator("text=No Pending Requests")).toBeVisible();
  });

  // Test for today's schedule
  test("should display today’s date and schedule", async ({ page }) => {
    const today = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    // Verify the date displayed is today's date
    await expect(page.locator("text=Today -")).toContainText(today);

    // Check if schedule items are displayed
    const scheduleItems = await page.locator('[data-testid="schedule-item"]');
    if ((await scheduleItems.count()) > 0) {
      await expect(scheduleItems).toBeVisible();
    } else {
      await expect(page.locator("text=No Classes Today")).toBeVisible();
    }
  });

  // Test for BookTutorDialog visibility
  test("should display the BookTutorDialog component", async ({ page }) => {
    // Ensure the Book Tutor button/dialog is visible
    await expect(
      page.locator('[data-testid="book-tutor-dialog"]')
    ).toBeVisible();
  });

  // Test for HelpSessionForm visibility
  test("should display the HelpSessionForm component", async ({ page }) => {
    // Ensure the Help Session Form is visible
    await expect(
      page.locator('[data-testid="help-session-form"]')
    ).toBeVisible();
  });

  // Test for ApplyTutorForm visibility (for non-tutors)
  test("should display the ApplyTutorForm for non-tutors", async ({ page }) => {
    // Mock the user as not being a tutor
    const isTutor = false; // Adjust based on your mock logic

    if (!isTutor) {
      await expect(
        page.locator('[data-testid="apply-tutor-form"]')
      ).toBeVisible();
    } else {
      await expect(
        page.locator('[data-testid="apply-tutor-form"]')
      ).not.toBeVisible();
    }
  });

  // Test for sorting courses in the schedule
  // Test for no classes today message
  test('should display "No Classes Today" message if no courses are scheduled', async ({
    page,
  }) => {
    const scheduleItems = await page.locator('[data-testid="schedule-item"]');
    if ((await scheduleItems.count()) === 0) {
      await expect(page.locator("text=No Classes Today")).toBeVisible();
    }
  });
});
