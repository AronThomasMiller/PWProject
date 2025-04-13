import { Locator } from "@playwright/test";

export class HeaderFragment {
  navCart: Locator;

  constructor(readonly page) {
    this.navCart = this.page.locator('[data-test="nav-cart"]');
  }

  async goToCart(): Promise<void> {
    await this.navCart.click();
  }
}
