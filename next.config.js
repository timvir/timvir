import * as path from "node:path";
import { withLinaria } from "./next/withLinaria.js";
import { remarkPlugin } from "./pkg/mdx/index.js";
import stylexPlugin from "@stylexswc/nextjs-plugin";

const rootDir = new URL(".", import.meta.url).pathname;

function withPlugins(plugins, config) {
  return plugins.reduce((a, f) => f(a), config);
}

const plugins = [
  withLinaria({ cacheDirectory: "./.next/cache/linaria" }),
  stylexPlugin({
    /*
     * CSS Cascade Layers are widely available across major browsers.
     */
    useCSSLayers: true,

    rsOptions: {
      dev: process.env.NODE_ENV !== "production",
      aliases: {
        "@/timvir/*": [path.join(rootDir, "src", "timvir", "*")],
        "timvir/*": [path.join(rootDir, "pkg", "timvir", "*")],
      },
      unstable_moduleResolution: {
        type: "commonJS",
        rootDir,
      },
      classNamePrefix: "timvir",
    },
  }),
];

export default withPlugins(plugins, {
  reactStrictMode: true,
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
