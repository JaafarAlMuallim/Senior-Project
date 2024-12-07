import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page
    .getByText(
      "EduLinkHomeFeaturesStatisticsStart LearningToggle themeLoginSign Up"
    )
    .click();
  await page.getByRole("link", { name: "Features" }).click();
  await page.getByRole("link", { name: "Statistics" }).click();
  await page.getByRole("link", { name: "Sign Up" }).click();
  await page.getByLabel("First name").click();
  await page.getByLabel("First name").fill("Jaafar");
  await page.getByLabel("Last name").click();
  await page.getByLabel("Last name").fill("Testing");
  await page.getByLabel("Email address").click();
  await page.getByLabel("Email address").fill("jafar9936.m.m@gmail.com");
  await page.getByLabel("Email address").press("Tab");
  await page.getByLabel("Password", { exact: true }).click();
  await page
    .getByLabel("Password", { exact: true })
    .fill("JaaferHelloWorld123");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel("Enter verification code. Digit").fill("6");
  await page.getByLabel("Digit 2").fill("5");
  await page.getByLabel("Digit 3").fill("1");
  await page.getByLabel("Digit 4").fill("9");
  await page.getByLabel("Digit 5").fill("9");
  await page.getByLabel("Digit 6").fill("9");
  await page.goto("http://localhost:3000/onboarding");
  await page.getByRole("button", { name: "Start Learning" }).click();
  await page.getByLabel("Phone Number").click();
  await page.getByLabel("Phone Number").fill("0540000001");
  await page.getByLabel("University").click();
  await page.getByRole("option", { name: "KFUPM" }).click();
  await page.getByLabel("Major").click();
  await page.getByRole("option", { name: "Computer Science" }).click();
  await page.getByRole("button", { name: "Start Learning" }).click();
  await page.goto("http://localhost:3000/home");
  await page
    .locator("div")
    .filter({ hasText: "My CoursesTutoring SessionsNo" })
    .nth(1)
    .click();
  await page.getByText("EduLinkHomeChatScheduleToggle").click();
});
