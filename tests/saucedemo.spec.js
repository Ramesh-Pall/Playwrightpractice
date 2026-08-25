const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');
const { InventoryPage } = require('../pages/inventory.page');
const { CartPage } = require('../pages/cart.page');
const { getCredentials, getProductCount } = require('../utils/test-data');

const productCount = getProductCount();
const credentials = getCredentials();

test(`adds the first ${productCount} products to the cart`, async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login(credentials.username, credentials.password);

  const expectedProductNames = await inventoryPage.getProductNames(productCount);
  await inventoryPage.addFirstProducts(productCount);
  await inventoryPage.openCart();

  await expect(page).toHaveURL(/\/cart\.html/);
  await expect(cartPage.cartItems).toHaveCount(productCount);
  await expect.poll(() => cartPage.getProductNames()).toEqual(expectedProductNames);
});