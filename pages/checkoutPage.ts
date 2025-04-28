/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { expect, Locator, Page } from "@playwright/test";
import { getCardExpirationDate } from "../utils/getCardExpirationDate";
import { billingAddressData, paymentData, paymentMethod } from "../utils/testData";

export class CheckoutPage {
  billingStreet: Locator;
  billingCity: Locator;
  billingState: Locator;
  billingPostCode: Locator;
  billingCountry: Locator;

  paymentMethod: Locator;
  cardNumber: Locator;
  expirationDate: Locator;
  cvv: Locator;
  cardHolder: Locator;
  confirmButton: Locator;
  paymentSuccessMessage: Locator;
  paymentSuccessOrder: Locator;
  productTitle: Locator;
  unitPrice: Locator;
  totalPrice: Locator;
  proceedToCheckout1: Locator;
  proceedToCheckout2: Locator;
  proceedToCheckout3: Locator;
  userLoggedInMessage: Locator;

  constructor(private page: Page) {
    this.billingStreet = page.getByTestId("street");
    this.billingCity = page.getByTestId("city");
    this.billingState = page.getByTestId("state");
    this.billingCountry = page.getByTestId("country");
    this.billingPostCode = page.getByTestId("postal_code");
    this.paymentMethod = page.getByTestId("payment-method");
    this.cardNumber = page.getByTestId("credit_card_number");
    this.expirationDate = page.getByTestId("expiration_date");
    this.cvv = page.getByTestId("cvv");
    this.cardHolder = page.getByTestId("card_holder_name");
    this.confirmButton = page.getByTestId("finish");
    this.paymentSuccessMessage = page.getByText("Payment was successful");
    this.paymentSuccessOrder = page.getByText(
      "Thanks for your order! Your invoice number is"
    );
    this.productTitle = page.getByTestId("product-title");
    this.unitPrice = page.getByTestId("product-price");
    this.totalPrice = page.getByTestId("cart-total");
    this.proceedToCheckout1 = page.getByTestId("proceed-1");
    this.proceedToCheckout2 = page.getByTestId("proceed-2");
    this.proceedToCheckout3 = page.getByTestId("proceed-3");
    this.userLoggedInMessage = page.getByText("you are already logged in", {
      exact: false,
    });
  }

  async fillBillingAddress() {
    await this.billingStreet.fill(billingAddressData.street);
    await this.billingCity.fill(billingAddressData.city);
    await this.billingState.fill(billingAddressData.state);
    await this.billingCountry.fill(billingAddressData.country);
    await this.billingPostCode.fill(billingAddressData.postCode);
    await this.proceedToCheckout3.click();
  }

  async fillPaymentDetails() {
    const threeMonthsLater: string = getCardExpirationDate();
    await this.cardNumber.fill(paymentData.cardNumber);
    await this.expirationDate.fill(threeMonthsLater);
    await this.cvv.fill(paymentData.cvv);
    await this.cardHolder.fill(paymentData.cardHolder);
    await this.confirmButton.click();
  }



  async expectProductTitleToContainText(name: string): Promise<void> {
    await expect(this.productTitle).toContainText(name);
  }

  async expectPageToContainCorrectUnitPrice(price: string): Promise<void> {
    await expect(this.unitPrice).toContainText(price);
  }

  async expectPageToContainCorrectTotalPrice(price: string): Promise<void> {
    await expect(this.totalPrice).toContainText(price);
  }

  async clickOnProceedToCheckoutButton(): Promise<void> {
    await this.proceedToCheckout1.click();
  }

  async expectUserIsLoggedIn(): Promise<void> {
    await expect(this.userLoggedInMessage).toBeVisible();
    await this.proceedToCheckout2.click();
  }

  async choosePaymentMethod(): Promise<void> {
    await this.paymentMethod.selectOption(paymentMethod.paymentType1);
  }

  async confirmPayment(): Promise<void> {
    await this.confirmButton.click();
  }
}
