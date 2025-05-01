import { test } from "../fixtures";
import { expect } from "@playwright/test";

test("Verify user can view product details", async ({ homePage, productPage }) => {
  await homePage.navigate();
  await homePage.clickOnProductCard(0);

  expect(homePage.page.url()).toContain("/product");
  await productPage.expectProductNameToContainText("Combination Pliers");
  await productPage.expectUnitPriceToContainText("14.15");
  await productPage.expectAddToCartToBeVisible();
  await productPage.expectAddToFavoritesButtonToBeVisible();
});
