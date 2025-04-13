import { test } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { config } from "../env.config";

test("Test 1: Verify login with valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto(`${config.weburl}/auth/login`);
  await loginPage.login(`${config.useremail}`, `${config.userpassword}`);
  await loginPage.expectUrlToContainAccount(`${config.weburl}`);
  await loginPage.expectPageTitleToContainText("My account");
  await loginPage.expectNavMenuToContainText(`${config.username}`);
});
