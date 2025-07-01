import { withLinaria } from "./next/withLinaria.js"
import { remarkPlugin } from "./pkg/mdx/index.js";

export default withLinaria({ cacheDirectory: "./.next/cache/linaria" })({
  productionBrowserSourceMaps: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  webpack(config, options) {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          options: {
            remarkPlugins: [remarkPlugin],
          },
        },
      ],
    });

    config.module.rules.push({
      test: /core\/theme\/detector/,
      type: "asset/source",
    });

    return config;
  },
});
