import createMDX from "@next/mdx";
import stylexPlugin from "@stylexswc/nextjs-plugin/turbopack";
import type { NextConfig } from "next";

function withPlugins(plugins: Array<(config: NextConfig) => NextConfig>, config: NextConfig) {
  return plugins.reduce((a, f) => f(a), config);
}

const plugins = [
  stylexPlugin({
    rsOptions: {
      dev: process.env.NODE_ENV !== "production",
    },
  }),
  createMDX({
    options: {
      providerImportSource: "mdx-components",
      remarkPlugins: [require.resolve("./timvir-remark-plugin.js")],
    },
  }),
];

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  reactCompiler: true,
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

export default withPlugins(plugins, nextConfig);
