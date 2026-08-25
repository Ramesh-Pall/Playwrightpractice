const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const supportedEnvironments = ['qa', 'uat'];

function loadEnvironment() {
  const environmentName = (process.env.TEST_ENV || 'qa').toLowerCase();

  if (!supportedEnvironments.includes(environmentName)) {
    throw new Error(`TEST_ENV must be one of: ${supportedEnvironments.join(', ')}.`);
  }

  const environmentFile = path.join(__dirname, 'environments', `${environmentName}.env`);

  if (!fs.existsSync(environmentFile)) {
    throw new Error(`Environment file not found: ${environmentFile}`);
  }

  const environment = dotenv.parse(fs.readFileSync(environmentFile));
  const baseURL = process.env.BASE_URL || environment.BASE_URL;

  if (!baseURL) {
    throw new Error(`BASE_URL is missing from ${environmentFile}.`);
  }

  return { name: environmentName, baseURL };
}

module.exports = { loadEnvironment };