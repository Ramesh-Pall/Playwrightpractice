class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addFirstProducts(count) {
    for (let index = 0; index < count; index += 1) {
      await this.inventoryItems.nth(index).locator('button').click();
    }
  }

  async getProductNames(count) {
    return this.inventoryItems
      .locator('.inventory_item_name')
      .allTextContents()
      .then((names) => names.slice(0, count));
  }

  async openCart() {
    await this.cartLink.click();
  }
}

module.exports = { InventoryPage };