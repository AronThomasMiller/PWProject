import { test, expect } from '@playwright/test';

test('Test 1: Verify login with valid credentials', async ({ page }) => {
    await page.goto(process.env.WEB_URL + '/auth/login');
    await page.fill('#email', process.env.USER_EMAIL ?? '');
    await page.fill('#password', process.env.USER_PASSWORD ?? '');
    await page.getByTestId('login-submit').click();

    await expect(page).toHaveURL('/account');
    await expect(page.getByTestId('page-title')).toContainText('My account');
    await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');
})

test('Test 2: Verify user can view product details', async ({ page }) => {
    await page.goto(process.env.WEB_URL + '');
    await page.locator("[class='card']").nth(0).click()

    await expect(page).toHaveURL(/\/product\//);
    await expect(page.getByTestId('product-name')).toContainText('Combination Pliers');
    await expect(page.getByTestId('unit-price')).toContainText('14.15');
    await expect(page.getByTestId('add-to-cart')).toBeVisible();
    await expect(page.getByTestId('add-to-favorites')).toBeVisible();
})

test('Test 3: Verify user can add product to cart', async ({ page }) => {
    await page.goto(process.env.WEB_URL + '');
    await page.locator("[class='card']").nth(4).click() 

    await expect(page).toHaveURL(/\/product\//);
    await expect(page.getByTestId('product-name')).toContainText('Slip Joint Pliers');
    await expect(page.getByTestId('unit-price')).toContainText('9.17');

    await page.getByTestId('add-to-cart').click();

    await expect(page.getByRole('alert', { name: 'Product added to shopping cart' })).toContainText('Product added to shopping cart');
    await expect(page.getByRole('alert', { name: 'Product added to shopping cart' })).not.toBeVisible({ timeout: 8000 });
    await expect(page.getByRole('alert', { name: 'Product added to shopping cart' })).toBeHidden();
 
    await page.getByTestId('nav-cart').click();

    await expect(page).toHaveURL('/checkout');
    await expect(page.getByTestId('cart-quantity')).toContainText('1');
    await expect(page.getByTestId('product-title')).toContainText('Slip Joint Pliers');
    await expect(page.getByTestId('proceed-1')).toBeVisible();
})
