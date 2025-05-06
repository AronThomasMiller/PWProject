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
  checkoutPage,
}) => {
  let productName: string | null = null;
  let unitPrice: string | null = null;

  await test.step("Navigate to home and open first product", async () => {
    await homePage.navigate();
    await homePage.clickOnProductCard(0);
    expect(homePage.page.url()).toContain("/product");

    productName = await productPage.productName.textContent();
    unitPrice = await productPage.unitPrice.textContent();
  });

  await test.step("Add product to cart and go to checkout", async () => {
    await productPage.clickOnAddToCartButton();
    await productPage.header.goToCart();
    await expect(homePage.page).toHaveURL("/checkout");
  });

  await test.step("Verify checkout details", async () => {
    await checkoutPage.expectProductTitleToContainText(productName ?? "");
    await checkoutPage.expectPageToContainCorrectUnitPrice(unitPrice ?? "");
    await checkoutPage.expectPageToContainCorrectTotalPrice(unitPrice ?? "");
  });

  await test.step("Proceed with billing and payment", async () => {
    await checkoutPage.clickOnProceedToCheckoutButton();
    await checkoutPage.expectUserIsLoggedIn();
    await checkoutPage.fillBillingAddress(billingAddressData);
    await checkoutPage.choosePaymentMethod(paymentMethod);
    await checkoutPage.fillPaymentDetails(paymentData);
    await checkoutPage.confirmPayment();
  });

  await test.step("Verify payment confirmation", async () => {
    await expect(checkoutPage.paymentSuccessMessage).toBeVisible();
    await checkoutPage.confirmPayment();
    await expect(checkoutPage.paymentSuccessOrder).toBeVisible();
  });
});
