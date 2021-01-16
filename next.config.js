const withSass = require('@zeit/next-sass');
// eslint-disable-next-line import/no-unresolved
const withCSS = require('@zeit/next-css');

module.exports = withCSS(withSass());
