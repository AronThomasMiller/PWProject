/* eslint-disable playwright/no-conditional-in-test */
/* eslint-disable playwright/expect-expect */
/* eslint-disable playwright/no-networkidle */
import { test } from "../fixtures";
import { PowerTools } from "../utils/enums";

[{ isAsc: true }, { isAsc: false }].forEach(({ isAsc }) => {
  test(`Verify user can perform sorting by name (${
    isAsc ? "asc" : "desc"
  })`, async ({ homePage }) => {
    await homePage.navigate();
    await homePage.productsFilterFragment.sortByName(isAsc);
    await homePage.page.waitForLoadState("networkidle");
    await homePage.productsFilterFragment.expectProductNamesAreSorted(isAsc);
  });
});

[{ isAsc: true }, { isAsc: false }].forEach(({ isAsc }) => {
  test(`Verify user can perform sorting by price  (${
    isAsc ? "asc" : "desc"
  })`, async ({ homePage }) => {
    await homePage.navigate();
    await homePage.productsFilterFragment.sortByPrice(isAsc);
    await homePage.page.waitForLoadState("networkidle");
    await homePage.productsFilterFragment.expectProductPricesAreSorted(isAsc);
  });
});

test("Verify user can filter products by category", async ({ homePage }) => {
  await homePage.navigate();
  const checkbox = homePage.productsFilterFragment.getCheckbox(
    PowerTools.SANDER
  );
  await checkbox.check();
  await homePage.page.waitForLoadState("networkidle");
  await homePage.productsFilterFragment.expectAllProductContainText(
    PowerTools.SANDER
  );
});
