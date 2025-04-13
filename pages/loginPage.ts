import { expect, Locator, Page } from "@playwright/test";
import { HeaderFragment } from "./headerFragments";

export class LoginPage {
  page: Page;
  emailLocator: Locator;
  password: Locator;
  submitButton: Locator;
  header: HeaderFragment;
  pageTitle: Locator;
  navMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailLocator = this.page.locator('[data-test="email"]');
    this.password = this.page.locator('[data-test="password"]');
    this.submitButton = this.page.locator('[data-test="login-submit"]');
    this.header = new HeaderFragment(page);
    this.pageTitle = this.page.getByTestId("page-title");
    this.navMenu = this.page.getByTestId("nav-menu");
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailLocator.fill(email);
    await this.password.fill(password);
    await this.submitButton.click();
  }

  async expectPageTitleToContainText(text: string): Promise<void> {
    await expect(this.pageTitle).toContainText(text);
  }

  async expectNavMenuToContainText(text: string): Promise<void> {
    await expect(this.navMenu).toContainText(text);
  }

  async expectUrlToContainAccount(url): Promise<void> {
    await expect(this.page).toHaveURL(`${url}/account`);
  }
}
