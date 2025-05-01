import { test } from "../fixtures";
import { expect } from "@playwright/test";
import {
  billingAddressData,
  paymentData,
  paymentMethod,
} from "../utils/testData";

test("User can purchase first product successfully", async ({
  homePage,
  productPage,
  loggedApp: loggedInPage,
  loginPage,
  checkoutPage,
}) => {
  await expect(loggedInPage).toHaveURL("/account");
  await loginPage.expectPageTitleToContainText("My account");

  await homePage.navigate();
  await homePage.clickOnProductCard(0);
  expect(homePage.page.url()).toContain("/product");

  const productName = await productPage.productName.textContent();
  const unitPrice = await productPage.unitPrice.textContent();

  await productPage.clickOnAddToCartButton();
  await productPage.header.goToCart();
  await expect(homePage.page).toHaveURL("/checkout");

  await checkoutPage.expectProductTitleToContainText(productName ?? "");
  await checkoutPage.expectPageToContainCorrectUnitPrice(unitPrice ?? "");
  await checkoutPage.expectPageToContainCorrectTotalPrice(unitPrice ?? "");
  await checkoutPage.clickOnProceedToCheckoutButton();
  await checkoutPage.expectUserIsLoggedIn();
  await checkoutPage.fillBillingAddress(billingAddressData);
  await checkoutPage.choosePaymentMethod(paymentMethod);
  await checkoutPage.fillPaymentDetails(paymentData);
  await checkoutPage.confirmPayment();
  await expect(checkoutPage.paymentSuccessMessage).toBeVisible();
  await checkoutPage.confirmPayment();
  await expect(checkoutPage.paymentSuccessOrder).toBeVisible();
});
