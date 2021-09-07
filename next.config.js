const withPlugins = require("next-compose-plugins");
const withLinaria = require("next-linaria");

module.exports = withPlugins([require("@next/mdx")({ extension: /\.mdx?$/ }), withLinaria], {
  linaria: {
    cacheDirectory: "./.next/cache/linaria",
  },

  productionBrowserSourceMaps: true,

  typescript: {
    ignoreDevErrors: true,
    ignoreBuildErrors: true,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});
