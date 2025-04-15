import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { ProductPage } from "../pages/productPage";

test("Test 2: Verify user can view product details", async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.navigate();
  await homePage.clickOnProductCard(0);

  const productPage = new ProductPage(page);

  await expect(page.url()).toContain("/product");
  await productPage.expectProductNameToContainText("Combination Pliers");
  await productPage.expectUnitPriceToContainText("14.15");
  await productPage.expectAddToCartToBeVisible();
  await productPage.expectAddToFavoritesButtonToBeVisible();
});
