class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
  }

  async getProductNames() {
    return this.cartItems.locator('.inventory_item_name').allTextContents();
  }
}

module.exports = { CartPage };