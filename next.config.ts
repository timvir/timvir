import stylexPlugin from "@stylexswc/nextjs-plugin/turbopack";
import createMDX from "@next/mdx";

function withPlugins(plugins: Array<any>, config: any) {
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

export default withPlugins(plugins, {
  productionBrowserSourceMaps: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});
