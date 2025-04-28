import { test as base, Page } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import { HomePage } from "./pages/homePage";
import { ProductPage } from "./pages/productPage";
import { ProductsFilterFragment } from "./pages/productsFiltersFragment";
import { HeaderFragment } from "./pages/headerFragments";
import { AlertFragment } from "./pages/alertFragment";
import { CheckoutPage } from "./pages/checkoutPage";
import { config } from "./env.config";

type MyFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  productPage: ProductPage;
  productsFilterFragment: ProductsFilterFragment;
  headerFragment: HeaderFragment;
  alertFragment: AlertFragment;
  checkoutPage: CheckoutPage;
  loggedApp: Page;
};

export const test = base.extend<MyFixtures>({
  loggedApp: async ({ page }, use) => {
    await page.goto(`${config.weburl}/auth/login`);
    const loginPage = new LoginPage(page);
    await loginPage.login("customer@practicesoftwaretesting.com", "welcome01");
    await use(page);
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  headerFragment: async ({ page }, use) => {
    await use(new HeaderFragment(page));
  },

  alertFragment: async ({ page }, use) => {
    await use(new AlertFragment(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});
