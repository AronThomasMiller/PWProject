import { test } from "@playwright/test";
import { ProductPage } from "../pages/productPage";
import { config } from "../env.config";
import { HomePage } from "../pages/homePage";

test("Test 3: Verify user can add product to cart", async ({ page }) => {
  const productPage = new ProductPage(page);
  const homePage = new HomePage(page);

  await homePage.navigate();
  await homePage.clickOnProductCard(4);

  await productPage.expectUrlToContainProductId(config.weburl);
  await productPage.expectPageToContainCorrectProductName();
  await productPage.expectPageToContainCorrectUnitPrice();

  await productPage.clickOnAddToCartButton();

  await productPage.expectAllertToContainText();
  await productPage.expectAlertDisapperAfer8Sec();
  await productPage.expectAlertIsHidden();

  await productPage.header.goToCart();
  await productPage.expectUrlToContainCheckout(config.weburl);

  await productPage.expectCartQuantityToContainValue();
  await productPage.expectProductTitleToContainText();
  await productPage.expectProceedToBeVisible();
});
