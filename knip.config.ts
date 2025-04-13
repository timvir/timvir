import { KnipConfig } from "knip";

const config: KnipConfig = {
  ignore: [],

  entry: [
    "playwright.config.ts",

    "config/rollup.config.js",

    "pkg/timvir/**/*",
  ],
};

export default config;
