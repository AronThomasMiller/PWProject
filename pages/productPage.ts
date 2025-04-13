import { expect, Locator, Page } from "@playwright/test";
import { HeaderF } from "./headerFragments";

export class ProductPage {
  page: Page;
  addToCartButton: Locator;
  productName: Locator;
  unitPrice: Locator;
  addToFavoritesButton: Locator;
  alert: Locator;
  cartQuantity: Locator;
  productTitle: Locator;
  proceed: Locator;
  header: HeaderF;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = this.page.locator('[data-test="add-to-cart"]');
    this.productName = this.page.getByTestId("product-name");
    this.unitPrice = this.page.getByTestId("unit-price");
    this.addToFavoritesButton = this.page.getByTestId("add-to-favorites");
    this.alert = this.page.getByRole("alert", {
      name: "Product added to shopping cart",
    });
    this.cartQuantity = this.page.getByTestId("cart-quantity");
    this.productTitle = this.page.getByTestId("product-title");
    this.proceed = this.page.getByTestId("proceed-1");
    this.header = new HeaderF(page);
  }

  async clickOnAddToCartButton(): Promise<void> {
    await this.addToCartButton.click();
  }

  async expectProductNameToContainText(text): Promise<void> {
    await expect(this.productName).toContainText(text);
  }

  async expectUnitPriceToContainText(text): Promise<void> {
    await expect(this.unitPrice).toContainText(text);
  }

  async expectAddToCartToBeVisible(): Promise<void> {
    await expect(this.addToCartButton).toBeVisible();
  }

  async expectAddToFavoritesButtonToBeVisible(): Promise<void> {
    await expect(this.addToFavoritesButton).toBeVisible();
  }

  async expectUrlToContainProductId(url): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`^${url}/product/[A-Z0-9]+$`));
  }

  async expectPageToContainCorrectProductName(): Promise<void> {
    await expect(this.productName).toContainText("Slip Joint Pliers");
  }

  async expectPageToContainCorrectUnitPrice(): Promise<void> {
    await expect(this.unitPrice).toContainText("9.17");
  }

  async expectAllertToContainText(): Promise<void> {
    await expect(this.alert).toContainText("Product added to shopping cart");
  }

  async expectAlertDisapperAfer8Sec(): Promise<void> {
    await expect(this.alert).not.toBeVisible({ timeout: 8000 });
  }

  async expectAlertIsHidden(): Promise<void> {
    await expect(this.alert).toBeHidden();
  }

  async expectUrlToContainCheckout(url): Promise<void> {
    await expect(this.page).toHaveURL(`${url}/checkout`);
  }

  async expectCartQuantityToContainValue(): Promise<void> {
    await expect(this.cartQuantity).toContainText("1");
  }

  async expectProductTitleToContainText(): Promise<void> {
    await expect(this.productTitle).toContainText("Slip Joint Pliers");
  }

  async expectProceedToBeVisible(): Promise<void> {
    await expect(this.cartQuantity).toBeVisible();
  }
}
