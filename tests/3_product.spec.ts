import { test } from "../fixtures";
import { expect } from "@playwright/test";

test("Verify user can add product to cart", async ({
  homePage,
  productPage,
}) => {
  await homePage.navigate();
  await homePage.clickOnProductCard(4);

  expect(homePage.page.url()).toContain("/product");
  await productPage.expectPageToContainCorrectProductName("Slip Joint Pliers");
  await productPage.expectPageToContainCorrectUnitPrice("9.17");

  await productPage.clickOnAddToCartButton();
  
  await productPage.alertFragment.expectAlertToContainText();
  await productPage.alertFragment.expectAlertDisappearAfter8Sec();
  await productPage.alertFragment.expectAlertIsHidden();

  await productPage.header.goToCart();
  await expect(homePage.page).toHaveURL("/checkout");

  await productPage.expectCartQuantityToContainValue("1");
  await productPage.expectProductTitleToContainText("Slip Joint Pliers");
  await productPage.expectProceedToBeVisible();
});
