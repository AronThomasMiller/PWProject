import { Locator, Page } from "@playwright/test";

export class HeaderFragment {
  navCart: Locator;

  constructor(readonly page: Page) {
    this.navCart = this.page.getByTestId("nav-cart");
  }

  async goToCart(): Promise<void> {
    await this.navCart.click();
  }
}
