const withCSS = require("@zeit/next-css");
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/
});

module.exports = withCSS(
  withMDX({
    typescript: {
      ignoreDevErrors: true,
      ignoreBuildErrors: true
    },
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

    webpack(config) {
      config.module.rules.push({
        test: /\.(js|ts)x?$/,
        use: [
          {
            loader: "linaria/loader",
            options: { sourceMap: true }
          }
        ]
      });

      return config;
    }
  })
);
