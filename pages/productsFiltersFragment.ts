import { expect, Locator, Page } from "@playwright/test";
import { PowerTools } from "./enums";

export class ProductsFilterFragment {
  page: Page;
  sortDropDown: Locator;
  sanderCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropDown = this.page.locator('[data-test="sort"]');
    this.sanderCheckbox = this.page.getByLabel(PowerTools.SANDER, {
      exact: false,
    });
  }

  async sortByName(isAsc: Boolean): Promise<void> {
    await this.sortDropDown.selectOption(`name,${isAsc ? "asc" : "desc"}`);
    await this.page.waitForTimeout(500);
  }

  async sortByPrice(isAsc: Boolean): Promise<void> {
    await this.sortDropDown.selectOption(`price,${isAsc ? "asc" : "desc"}`);
    await this.page.waitForTimeout(500);
  }

  async getAllProductNames(): Promise<string[]> {
    return this.page.locator('[data-test="product-name"]').allInnerTexts();
  }

  async getAllProductPrices(): Promise<number[]> {
    const priceStrings = await this.page
      .locator('[data-test="product-price"]')
      .allInnerTexts();
    return priceStrings.map((text) => parseFloat(text.replace("$", "").trim()));
  }

  async expectProductNamesAreSorted(isAsc: boolean): Promise<void> {
    const productNames = await this.getAllProductNames();
    const sortedNames = isAsc
      ? [...productNames].sort((a, b) => a.localeCompare(b))
      : [...productNames].sort((a, b) => b.localeCompare(a));

    expect(productNames).toEqual(sortedNames);
  }

  async expectProductPricesAreSorted(isAsc: boolean): Promise<void> {
    const prices = await this.getAllProductPrices();
    const sorted = isAsc
      ? [...prices].sort((a, b) => a - b)
      : [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sorted);
  }

  async checkSander(): Promise<void> {
    await this.sanderCheckbox.check();
    await this.page.waitForTimeout(500);
  }

  async expectAllProductContainText(text: string): Promise<void> {
    const productNames = await this.getAllProductNames();
    productNames.forEach((name) => expect(name).toContain(text));
  }
}
