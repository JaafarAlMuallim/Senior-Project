import { test } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.locator("h1").click();
  await page.getByRole("img", { name: "App Preview" }).click();
  await page
    .getByText(
      "EduLinkHomeFeaturesStatisticsStart LearningToggle themeLoginSign Up"
    )
    .click();
  await page.getByRole("button", { name: "Start Learning" }).click();
  await page.getByRole("button", { name: "Toggle theme" }).click();
  await page.locator("html").click();
  await page.getByRole("link", { name: "Home" }).click();
  await page.locator("html").click();
  await page.getByRole("link", { name: "Features" }).click();
  await page.getByRole("link", { name: "Statistics" }).click();
  await page.getByRole("link", { name: "Sign Up" }).click();
  await page
    .getByText(
      "Create your accountWelcome! Please fill in the details to get started.Continue"
    )
    .click();
  await page.getByRole("link", { name: "Login" }).click();
  await page
    .getByText(
      "Sign in to EduLinkWelcome back! Please sign in to continueContinue with"
    )
    .click();
  await page
    .getByRole("button", { name: "Sign in with Google Continue" })
    .click();
  await page.getByLabel("Email or phone").fill("XXXX");
  await page.getByLabel("Email or phone").press("Enter");
  await page.getByLabel("Try again").click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.goto("http://localhost:3000/sign-in");
  await page.getByLabel("Email address").click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel("Enter verification code. Digit").fill("X");
  await page.getByLabel("Digit 2").fill("X");
  await page.getByLabel("Digit 3").fill("X");
  await page.getByLabel("Digit 4").fill("X");
  await page.getByLabel("Digit 5").fill("X");
  await page.getByLabel("Digit 6").fill("X");
  await page.goto("http://localhost:3000/home");
  await page.getByText("EduLinkHomeChatScheduleToggle").click();
  await page.goto("http://localhost:3000/schedule");
  await page.getByRole("link", { name: "Home" }).click();
  await page.goto("http://localhost:3000/home");
  await page.getByRole("heading", { name: "My Courses" }).click();
  await page.getByText("No Classes Today").click();
  await page
    .locator("div")
    .filter({ hasText: /^ics474Big Data Analytics$/ })
    .first()
    .click();
  await page.getByText("ScheduleToday - December 7,").click();
  await page.getByRole("button", { name: "New Help Session" }).click();
  await page.getByRole("button", { name: "New Help Session" }).click();
  await page.getByRole("button", { name: "Book Tutor" }).click();
  await page.getByLabel("Book Tutor").click();
  await page.getByLabel("Course").click();
  await page.getByRole("button", { name: "Close" }).click();
  await page.getByRole("heading", { name: "Pending Requests" }).click();
  await page.getByText("ics474Big Data Analytics").click();
  await page.goto("http://localhost:3000/home/cm177rnwp0000119qsarlyxia");
  await page.getByText("MATH 101FoldersUpload New").click();
  await page.getByRole("button", { name: "next" }).click();
  await page.getByLabel("Close").click();
  await page.goto("http://localhost:3000/home/cm177rnwp0000119qsarlyxia");
  await page.getByRole("tab", { name: "Quizzes" }).click();
  await page.getByLabel("Close").click();
  await page.goto("http://localhost:3000/home/cm177rnwp0000119qsarlyxia");
  await page.getByRole("button", { name: "Upload New Material" }).click();
  await page.getByRole("heading", { name: "Upload File" }).click();
  await page.getByLabel("Upload File").click();
  await page.getByText("65 | 66 | export const").click();
  await page.getByLabel("Close").click();
  await page.getByRole("button", { name: "Upload New Material" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Drop file to uploadPDF, PPTX, DOCX, PNG, JPG, JPEG$/ })
    .getByRole("img")
    .click();
  await page.getByLabel("Close").click();
  await page.getByRole("tab", { name: "Quizzes" }).click();
  await page
    .locator("div")
    .filter({ hasText: "Material Quizzes" })
    .first()
    .click();
  await page.getByLabel("Close").click();
  await page.goto("http://localhost:3000/home/cm177rnwp0000119qsarlyxia");
  await page.getByRole("tab", { name: "Quizzes" }).click();
  await page.goto("http://localhost:3000/home/cm177rnwp0000119qsarlyxia");
  await page.getByRole("tab", { name: "Quizzes" }).click();
  await page.getByText("ics 474QuizzesSelect Material").click();
  await page.getByRole("button", { name: "Select Material" }).click();
  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: "ICS 381 HW #5.pdf" }).click();
  await page
    .getByRole("option", { name: "SQL Injection and CAPTCHA(1)." })
    .click();
  await page.getByRole("button", { name: "Close" }).click();
  await page.getByRole("link", { name: "Quiz 1" }).click();
  await page.getByRole("link", { name: "Quiz 1" }).click();
  await page
    .locator("div")
    .filter({ hasText: "QuestionQ1. Which of the" })
    .nth(1)
    .click();
  await page
    .getByRole("button", { name: "A) The capacity to do work or" })
    .click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "D) -150 J" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "A) Heat and work" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "D) ΔH" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "C) It changes sign." }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page
    .getByRole("button", { name: "C) Endothermic and releases" })
    .click();
  await page.getByRole("button", { name: "Next" }).click();
  await page
    .getByRole("button", { name: "B) Raise the temperature of 1" })
    .click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "C) Usually ignored." }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "C) Always negative." }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "C) Zero." }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "C) -200 kJ/mol" }).click();
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByText("Quiz Completed!Your score: 6").click();
  await page.getByText("A) The capacity to do work or").click();
  await page.getByText("D) -150 J (Your answer)").click();
  await page.getByText("A) Heat and work (Your answer)").click();
  await page.getByText("B) Internal energy and").click();
  await page.getByText("Re-Take QuizReturn to Home").click();
  await page.getByRole("button", { name: "Return to Home" }).click();
  await page.getByRole("link", { name: "Schedule" }).click();
  await page.getByText("SUNMONTUEWEDTHU07:0008:0009:").click();
  await page.getByText("ics474Big Data Analytics").first().click();
  await page.getByText("ics474Big Data Analytics").nth(1).click();
  await page.getByText("SUN").click();
  await page.getByText("MON", { exact: true }).click();
  await page.getByText("TUE").click();
  await page.getByText("WED").click();
  await page.getByText("THU").click();
  await page.getByRole("link", { name: "Chat" }).click();
  await page.goto("http://localhost:3000/chat");
  await page.getByText("AIICS474Unfortunately, I don'").click();
  await page.getByText("RegularICS474status14:").click();
  await page.getByRole("button", { name: "AI" }).click();
  await page.getByRole("button", { name: "AI" }).click();
  await page.getByRole("button", { name: "Regular" }).click();
  await page.getByRole("button", { name: "Regular" }).click();
  await page
    .locator("li")
    .filter({ hasText: "ICS474Unfortunately, I don't" })
    .getByRole("heading")
    .click();
  await page.getByPlaceholder("Type your message...").click();
  await page.getByPlaceholder("Type your message...").fill("Hello World");
  await page.getByRole("button", { name: "Send message" }).click();
  await page
    .locator("li")
    .filter({ hasText: "ICS474status14:" })
    .locator("path")
    .nth(3)
    .click();
  await page.getByPlaceholder("Type your message...").click();
  await page.getByRole("link", { name: "Profile" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Connected - awaiting messages$/ })
    .nth(2)
    .click();
  await page.getByRole("button", { name: "Load more" }).click();
  await page.getByRole("main").click();
  await page.getByRole("button", { name: "Update Profile" }).click();
  await page.getByLabel("Close").click();
  await page.getByRole("button", { name: "Update Profile" }).click();
  await page.getByLabel("Close").click();
  await page.goto("http://localhost:3000/profile");
  await page.getByRole("heading", { name: "Schedule" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Scheduleics474Big Data Analytics$/ })
    .locator("div")
    .first()
    .click();
  await page.getByText("Tutorics474Big Data Analytics").click();
  await page.getByText("Scheduleics474Big Data").click();
  await page.getByText("Jaafer AL-MuallimUpdate").click();
  await page.getByRole("button", { name: "Update Profile" }).click();
  await page.getByLabel("Close").click();
  await page.goto("http://localhost:3000/profile");
  await page.getByRole("button", { name: "Update Profile" }).click();
  await page.getByRole("button", { name: "Close" }).click();
  await page.getByRole("button", { name: "Update Profile" }).click();
  await page.getByRole("button", { name: "Close" }).click();
  await page.getByRole("button", { name: "Update Profile" }).click();
  await page.getByRole("button", { name: "Close" }).click();
  await page.goto("http://localhost:3000/profile");
  await page.getByRole("button", { name: "Update Profile" }).click();
  await page.getByLabel("Edit profile").click();
  await page.goto("http://localhost:3000/admin");
  await page
    .getByText("Users of each typeDistribution of users across different types")
    .click();
  await page.getByRole("tab", { name: "Groups" }).click();
  await page
    .locator("div")
    .filter({
      hasText:
        "Messages Bar ChartShowing number of daily messagesOct 8Oct 9Oct 14Oct 23Dec",
    })
    .nth(3)
    .click();
  await page.getByLabel("Groups").locator("path").nth(1).click();
  await page.getByRole("tab", { name: "Reports" }).click();
  await page.getByRole("tab", { name: "Users" }).click();
  await page.getByRole("button", { name: "Switch to Table" }).click();
  await page
    .getByText(
      "Total Users50.00% from last monthActive Users3150.00% from last monthNew"
    )
    .click();
  await page
    .getByText(
      "ColumnsEmailNameDateActionsja3far03@gmail.comJaafer AL-Muallim9/12/2024Open"
    )
    .click();
  await page.getByRole("cell", { name: "Date" }).click();
  await page
    .getByRole("row", { name: "Select row ja3far03@gmail.com" })
    .getByRole("button")
    .click();
  await page.getByRole("menuitem", { name: "Copy ID" }).click();
  await page
    .locator("p")
    .filter({ hasText: "150.00% from last month" })
    .locator("polyline")
    .nth(1)
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Group Messages$/ })
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Total Messages$/ })
    .click();
  await page.getByText("ColumnsGroup NameLast").click();
  await page.getByRole("button", { name: "Columns" }).click();
  await page.getByRole("menuitemcheckbox", { name: "groupName" }).click();
  await page.getByText("ColumnsLast").click();
  await page.getByRole("button", { name: "Columns" }).click();
  await page.getByRole("menuitemcheckbox", { name: "groupName" }).click();
  await page.getByRole("button", { name: "Toggle theme" }).click();
});
