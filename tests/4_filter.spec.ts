/* eslint-disable playwright/no-networkidle */
import { test } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { PowerTools } from "../utils/enums";

[{ isAsc: true }, { isAsc: false }].forEach(({ isAsc }) => {
  test(`Verify user can perform sorting by name (${
    isAsc ? "asc" : "desc"
  })`, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await homePage.productsFilterFragment.sortByName(isAsc);
    await page.waitForLoadState("networkidle");
    await homePage.productsFilterFragment.expectProductNamesAreSorted(isAsc);
  });
});

[{ isAsc: true }, { isAsc: false }].forEach(({ isAsc }) => {
  test(`Verify user can perform sorting by price  (${
    isAsc ? "asc" : "desc"
  })`, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await homePage.productsFilterFragment.sortByPrice(isAsc);
    await page.waitForLoadState("networkidle");
    await homePage.productsFilterFragment.expectProductPricesAreSorted(isAsc);
  });
});

test("Verify user can filter products by category", async ({
  page,
}) => {
  const homePage = new HomePage(page);

  await homePage.navigate();
  const checkbox = homePage.productsFilterFragment.getCheckbox(
    PowerTools.SANDER
  );
  await checkbox.check();
  await page.waitForLoadState("networkidle");
  await homePage.productsFilterFragment.expectAllProductContainText(
    PowerTools.SANDER
  );
});
