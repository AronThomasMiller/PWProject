import { test, expect } from '@playwright/test';

test('Test 1: Verify login with valid credentials', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/auth/login');
    await page.fill('#email', 'customer@practicesoftwaretesting.com');
    await page.fill('#password', 'welcome01');
    await page.click('[data-test="login-submit"]')
    await page.waitForURL('https://practicesoftwaretesting.com/account');

    await expect(page.url()).toBe('https://practicesoftwaretesting.com/account');
    await expect(page.locator('[data-test="page-title"]')).toContainText('My account');
    await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jane Doe');
})

test('Test 2: Verify user can view product details', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com');
    await page.locator('[data-test="product-01JR0ARQYP313KEECXVV0B6XFD"]').click()

    await expect(page.url()).toContain('https://practicesoftwaretesting.com/product');
    await expect(page.locator('[data-test="product-name"]')).toContainText('Combination Pliers');
    await expect(page.locator('[data-test="unit-price"]')).toContainText('14.15');
    await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
    await expect(page.locator('[data-test="add-to-favorites"]')).toBeVisible();
})

test('Test 3: Verify user can add product to cart', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com');
    await page.locator('[data-test="product-01JR0ARQYYG1WAWJYRPSZRAAVV"]').click()

    await expect(page.url()).toContain('https://practicesoftwaretesting.com/product');
    await expect(page.locator('[data-test="product-name"]')).toContainText('Slip Joint Pliers');
    await expect(page.locator('[data-test="unit-price"]')).toContainText('9.17');

    await page.locator('[data-test="add-to-cart"]').click();
    
    await expect(page.getByRole('alert', { name: 'Product added to shopping cart' })).toBeVisible();
    await expect(page.getByRole('alert', { name: 'Product added to shopping cart' })).toContainText('Product added to shopping cart');
    await page.waitForTimeout(8000);
    await expect(page.getByRole('alert', { name: 'Product added to shopping cart' })).toBeHidden();
    await expect(page.locator('[data-test="cart-quantity"]')).toContainText('1');
    
    await page.locator('[data-test="nav-cart"]').click();
    await page.waitForURL('https://practicesoftwaretesting.com/checkout');

    await expect(page.url()).toBe('https://practicesoftwaretesting.com/checkout');
    await expect(page.locator('[data-test="cart-quantity"]')).toContainText('1');
    await expect(page.locator('[data-test="product-title"]')).toContainText('Slip Joint Pliers');
    await expect(page.locator('[data-test="proceed-1"]')).toBeVisible();
})
