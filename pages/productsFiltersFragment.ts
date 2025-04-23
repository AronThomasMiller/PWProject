import { expect, Locator, Page } from "@playwright/test";
import { PowerTools } from "../utils/enums";

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

  async sortByName(isAsc: boolean): Promise<void> {
    await this.sortDropDown.selectOption(`name,${isAsc ? "asc" : "desc"}`);
  }

  async sortByPrice(isAsc: boolean): Promise<void> {
    await this.sortDropDown.selectOption(`price,${isAsc ? "asc" : "desc"}`);
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

  async expectAllProductContainText(text: string): Promise<void> {
    const productNames = await this.getAllProductNames();

    const normalizedText = text.toLowerCase().trim();
    const found = productNames.some((name) =>
      name.toLowerCase().includes(normalizedText)
    );

    expect(found).toBeTruthy();
  }

  getCheckbox(label: PowerTools): Locator {
    return this.page.getByLabel(label, { exact: false });
  }
}
