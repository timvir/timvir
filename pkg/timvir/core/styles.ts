import * as stylex from "@stylexjs/stylex";

export const typography = stylex.create({
  base: {
    fontFamily: "system-ui, sans-serif",
    fontFeatureSettings: '"liga", "kern"',
    textRendering: "optimizelegibility",
  },
  mono: {
    fontFamily: "monospace",
    fontFeatureSettings: '"liga", "kern"',
    textRendering: "optimizelegibility",
  },
});
