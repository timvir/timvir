import withPlugins from "next-compose-plugins";
import withLinaria from "next-linaria";
import { remarkPlugin } from "./pkg/mdx/index.js";

export default withPlugins([withLinaria], {
  linaria: {
    cacheDirectory: "./.next/cache/linaria",
  },

  productionBrowserSourceMaps: true,

  typescript: {
    ignoreDevErrors: true,
    ignoreBuildErrors: true,
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
            providerImportSource: "@mdx-js/react",
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
