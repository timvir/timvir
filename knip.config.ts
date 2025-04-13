import { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: [
    "playwright.config.ts",

    "pkg/timvir/blocks/index.ts",
    "pkg/timvir/builtins/index.ts",
    "pkg/timvir/core/index.ts",
  ],
};

export default config;
