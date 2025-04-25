import { Locator, Page } from "@playwright/test";
import { ProductsFilterFragment } from "./productsFiltersFragment";
export class HomePage {
  page: Page;
  productsFilterFragment: ProductsFilterFragment;
  card: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsFilterFragment = new ProductsFilterFragment(page);
    this.card = this.page.locator(".card");
  }

  async navigate(): Promise<void> {
    await this.page.goto("/");
  }

  async clickOnProductCard(number: number): Promise<void> {
    const card = this.card.nth(number);
    while (!this.page.url().includes("product")) {
      await card.click();
    }
  }
}
