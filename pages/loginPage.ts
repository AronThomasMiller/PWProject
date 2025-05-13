import { expect, Locator, Page } from "@playwright/test";
import { HeaderFragment } from "./headerFragments";
import { config } from "../env.config";
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
    this.emailLocator = this.page.getByTestId("email");
    this.password = this.page.getByTestId("password");
    this.submitButton = this.page.getByTestId("login-submit");
    this.header = new HeaderFragment(page);
    this.pageTitle = this.page.getByTestId("page-title");
    this.navMenu = this.page.getByTestId("nav-menu");
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailLocator.waitFor({ state: "visible" });
    await this.emailLocator.fill(email);
    await this.password.fill(password);
    await this.submitButton.click();
  }

  async goToLogin(): Promise<void> {
    await this.page.goto(`${config.weburl}/auth/login`);
    //temp
    console.log("URL:")
    console.log(this.page.url());
     expect (this.page.url()).toBeDefined();
  }

  async expectPageTitleToContainText(text: string): Promise<void> {
    await expect(this.pageTitle).toContainText(text);
  }

  async expectNavMenuToContainText(text: string): Promise<void> {
    await expect(this.navMenu).toContainText(text);
  }

  async storeState(authFile: string): Promise<void> {
    await this.page.context().storageState({ path: authFile });
  }
}
