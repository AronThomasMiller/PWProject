import { test } from "../fixtures";
import { expect } from "@playwright/test";
import { config } from "../env.config";

test("Verify login with valid credentials", async ({ page, loginPage }) => {
  await test.step("Navigate to login page", async () => {
    await page.goto(`${config.weburl}/auth/login`);
  });

  await test.step("Login with valid credentials", async () => {
    await loginPage.login("customer@practicesoftwaretesting.com", "welcome01");
  });

  await test.step("Verify successful login", async () => {
    await expect(page).toHaveURL("/account");
    await loginPage.expectPageTitleToContainText("My account");
    await loginPage.expectNavMenuToContainText(`${config.username}`);
  });
});
