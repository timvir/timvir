import { withLinaria } from "./next/withLinaria.js";
import withMDX from "@next/mdx";
import { remarkPlugin } from "./pkg/mdx/index.js";

function withPlugins(plugins, config) {
  return plugins.reduce((a, f) => f(a), config);
}

const plugins = [
  withMDX({
    extension: /\.mdx?$/,
    options: {
      remarkPlugins: [remarkPlugin],
    },
  }),
  withLinaria({ cacheDirectory: "./.next/cache/linaria" }),
];

export default withPlugins(plugins, {
  productionBrowserSourceMaps: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  webpack(config) {
    config.module.rules.push({
      test: /core\/theme\/detector/,
      type: "asset/source",
    });

    return config;
  },
});
