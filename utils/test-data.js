const DEFAULT_PRODUCT_COUNT = 2;
const MAX_PRODUCT_COUNT = 6;

function getProductCount() {
  const configuredCount = process.env.PRODUCT_COUNT;

  if (configuredCount === undefined || configuredCount.trim() === '') {
    return DEFAULT_PRODUCT_COUNT;
  }

  const productCount = Number(configuredCount);

  if (!Number.isInteger(productCount) || productCount < 1 || productCount > MAX_PRODUCT_COUNT) {
    throw new Error(`PRODUCT_COUNT must be an integer from 1 to ${MAX_PRODUCT_COUNT}.`);
  }

  return productCount;
}

function getCredentials() {
  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_PASSWORD) {
    throw new Error('SAUCE_USERNAME and SAUCE_PASSWORD must be provided.');
  }

  return {
    username: process.env.SAUCE_USERNAME,
    password: process.env.SAUCE_PASSWORD,
  };
}

module.exports = { getCredentials, getProductCount };