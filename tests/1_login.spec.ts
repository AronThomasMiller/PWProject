import { test } from "../fixtures";
import { expect } from "@playwright/test";
import { config } from "../env.config";

test("Verify login with valid credentials", async ({ loggedApp: loggedInPage, loginPage }) => {
  await expect(loggedInPage).toHaveURL('/account');
  await loginPage.expectPageTitleToContainText("My account");
  await loginPage.expectNavMenuToContainText(`${config.username}`);
});
