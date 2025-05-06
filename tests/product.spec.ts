import { test } from "../fixtures";
import { expect } from "@playwright/test";

test("Verify user can add product to cart", async ({ homePage, productPage }) => {
  await test.step("Navigate to home page and open 5th product", async () => {
    await homePage.navigate();
    await homePage.clickOnProductCard(4);
    expect(homePage.page.url()).toContain("/product");
  });

  await test.step("Verify product name and price", async () => {
    await productPage.expectPageToContainCorrectProductName("Slip Joint Pliers");
    await productPage.expectPageToContainCorrectUnitPrice("9.17");
  });

  await test.step("Add product to cart and verify alert", async () => {
    await productPage.clickOnAddToCartButton();
    await productPage.alertFragment.expectAlertToContainText();
    await productPage.alertFragment.expectAlertDisappearAfter8Sec();
  });

  await test.step("Go to cart and verify product details", async () => {
    await productPage.header.goToCart();
    await expect(homePage.page).toHaveURL("/checkout");

    await productPage.expectCartQuantityToContainValue("1");
    await productPage.expectProductTitleToContainText("Slip Joint Pliers");
    await productPage.expectProceedToBeVisible();
  });
});
