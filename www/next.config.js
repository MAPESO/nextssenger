const withCSS = require('@zeit/next-css');

const nextConfig = withCSS({
  target: 'serverless',
  env: {
    CHATKIT_TOKEN: process.env.CHATKIT_TOKEN,
    CHATKIT_LOCATOR: process.env.CHATKIT_LOCATOR,
    JWT_KEY: process.env.JWT_KEY
  }
});

module.exports = nextConfig;
