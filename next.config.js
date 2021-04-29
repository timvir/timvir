const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

function configureLinaria(config) {
  const extension = ".linaria.module.css";

  /**
   * Traverse all rules (recursively) and patch the 'getLocalIdent' function of the css-loader
   * to return a filename which ends with '.linaria.module.css'. This is required because Next.js
   * only enforces *.module.css filenames when importing CSS from regular components (*.css is
   * reserved for _app).
   */
  function patchGetLocalIdent(rules) {
    for (const rule of rules) {
      if (typeof rule.loader === "string" && rule.loader.includes("css-loader")) {
        if (rule.options && rule.options.modules && typeof rule.options.modules.getLocalIdent === "function") {
          const nextGetLocalIdent = rule.options.modules.getLocalIdent;
          rule.options.modules.getLocalIdent = (context, _, exportName, options) => {
            if (context.resourcePath.includes(extension)) {
              return exportName;
            } else {
              return nextGetLocalIdent(context, _, exportName, options);
            }
          };
        }
      }

      if (typeof rule.use === "object") {
        patchGetLocalIdent(Array.isArray(rule.use) ? rule.use : [rule.use]);
      }

      if (Array.isArray(rule.oneOf)) {
        patchGetLocalIdent(rule.oneOf);
      }
    }
  }

  patchGetLocalIdent(config.module.rules);

  config.module.rules.push({
    test: /\.(js|ts)x?$/,
    use: [
      {
        loader: "@linaria/webpack-loader",
        options: {
          sourceMap: true,
          extension,
        },
      },
    ],
  });
}

module.exports = withMDX({
  future: {
    webpack5: true,
  },

  productionBrowserSourceMaps: true,

  typescript: {
    ignoreDevErrors: true,
    ignoreBuildErrors: true,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  webpack(config) {
    configureLinaria(config);
    return config;
  },
});
