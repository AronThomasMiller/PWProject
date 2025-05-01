import { test } from "../fixtures";
import { expect } from "@playwright/test";
import { config } from "../env.config";
const authFile = 'pw/.auth/user.json';

test("Verify login with valid credentials", async ({ page, loginPage }) => {
  await page.goto(`${config.weburl}/auth/login`);
  await loginPage.login("customer@practicesoftwaretesting.com", "welcome01");

  await expect(page).toHaveURL('/account');
  await loginPage.expectPageTitleToContainText("My account");
  await loginPage.expectNavMenuToContainText(`${config.username}`);
  await page.context().storageState({ path: authFile });
});



