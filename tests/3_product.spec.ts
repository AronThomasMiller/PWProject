import { expect, test } from "@playwright/test";
import { ProductPage } from "../pages/productPage";
import { config } from "../env.config";
import { HomePage } from "../pages/homePage";

test("Test 3: Verify user can add product to cart", async ({ page }) => {
  const productPage = new ProductPage(page);
  const homePage = new HomePage(page);

  await homePage.navigate();
  await homePage.clickOnProductCard(4);

  expect(page.url()).toContain('/product');
  await productPage.expectPageToContainCorrectProductName("Slip Joint Pliers");
  await productPage.expectPageToContainCorrectUnitPrice("9.17");

  await productPage.clickOnAddToCartButton();

  await productPage.alertFragment.expectAlertToContainText();
  await productPage.alertFragment.expectAlertDisappearAfter8Sec();
  await productPage.alertFragment.expectAlertIsHidden();

  await productPage.header.goToCart();
  expect(page).toHaveURL('/checkout');

  await productPage.expectCartQuantityToContainValue("1");
  await productPage.expectProductTitleToContainText("Slip Joint Pliers");
  await productPage.expectProceedToBeVisible();
});
