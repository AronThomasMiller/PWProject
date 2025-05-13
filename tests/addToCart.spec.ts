import { test } from "../fixtures";
import { expect } from "@playwright/test";

test("Verify user can view product details", async ({ homePage, productPage }) => {
  await test.step("Navigate to home page", async () => {
    await homePage.navigate();
  });

  await test.step("Click on the first product card", async () => {
    await homePage.clickOnProductCard(0);
    expect(homePage.page.url()).toContain("/product");
  });

  await test.step("Verify product details are visible and correct", async () => {
    await productPage.expectProductNameToContainText("Combination Pliers");
    await productPage.expectUnitPriceToContainText("14.15");
    await productPage.expectAddToCartToBeVisible();
    await productPage.expectAddToFavoritesButtonToBeVisible();
  });
});
