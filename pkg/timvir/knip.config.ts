export default {
  entry: [
    "core/theme/detector.ts",

    "blocks/index.ts",
    "blocks/*/index.ts",
    "builtins/index.ts",
    "bus/index.ts",
    "context/index.ts",
    "core/index.ts",
    "hooks/index.ts",
    "search/index.ts",

    "core/theme/colors.ts",
  ],

  ignore: ["blocks/*/samples/**/*.tsx", "core/components/*/samples/*.tsx", "search/*/samples/*.tsx"],

  ignoreDependencies: ["@linaria/*"],
};
