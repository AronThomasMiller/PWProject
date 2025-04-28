import { expect, Locator, Page } from "@playwright/test";

export class AlertFragment {
  alert: Locator;

  constructor(readonly page: Page) {
    this.alert = this.page.getByRole("alert", {
      name: "Product added to shopping cart",
    });
  }

  async expectAlertToContainText(): Promise<void> {
    await expect(this.alert).toContainText("Product added to shopping cart");
  }

  async expectAlertDisappearAfter8Sec(): Promise<void> {
    await expect(this.alert).not.toBeVisible({ timeout: 8000 });
    await expect(this.alert).toBeHidden();
  }
}
