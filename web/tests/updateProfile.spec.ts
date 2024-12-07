import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/profile");
  await page.getByRole("button", { name: "Save changes" }).click();
  await page.getByLabel("Name").click();
  await page.getByLabel("Name").fill("Jaafar ");
  await page.getByRole("button", { name: "Update Profile" }).click();
  await page.getByLabel("Name").click();
  await page.getByLabel("Name").fill("Jaafar Testing");
  await page
    .getByRole("button", { name: "Save changes" })
    .click()
    .then(async () => {
      await expect(page).toHaveURL("http://localhost:3000/profile");
    });
});
