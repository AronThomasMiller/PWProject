import { expect, Locator, Page } from "@playwright/test";
import { HeaderFragment } from "./headerFragments";
import { AlertFragment } from "./alertFragment";

export class ProductPage {
  page: Page;
  addToCartButton: Locator;
  productName: Locator;
  unitPrice: Locator;
  addToFavoritesButton: Locator;
  cartQuantity: Locator;
  productTitle: Locator;
  proceed: Locator;
  header: HeaderFragment;
  alertFragment: AlertFragment;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = this.page.locator('[data-test="add-to-cart"]');
    this.productName = this.page.getByTestId("product-name");
    this.unitPrice = this.page.getByTestId("unit-price");
    this.addToFavoritesButton = this.page.getByTestId("add-to-favorites");
    this.cartQuantity = this.page.getByTestId("cart-quantity");
    this.productTitle = this.page.getByTestId("product-title");
    this.proceed = this.page.getByTestId("proceed-1");
    this.header = new HeaderFragment(page);
    this.alertFragment = new AlertFragment(page);
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

  async expectPageToContainCorrectProductName(name): Promise<void> {
    await expect(this.productName).toContainText(name);
  }

  async expectPageToContainCorrectUnitPrice(price): Promise<void> {
    await expect(this.unitPrice).toContainText(price);
  }

  async expectCartQuantityToContainValue(quantity): Promise<void> {
    await expect(this.cartQuantity).toContainText(quantity);
  }

  async expectProductTitleToContainText(name): Promise<void> {
    await expect(this.productTitle).toContainText(name);
  }

  async expectProceedToBeVisible(): Promise<void> {
    await expect(this.cartQuantity).toBeVisible();
  }
}
