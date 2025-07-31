// craco.config.js
const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    configure: (webpackConfig) => {
      webpackConfig.ignoreWarnings = [
        {
          message: /Failed to parse source map/,
        },
      ];
      return webpackConfig;
    },
  },
};
