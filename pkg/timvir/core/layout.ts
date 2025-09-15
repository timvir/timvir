import * as stylex from "@stylexjs/stylex";

export const layoutStyles = stylex.create({
  grid: {
    display: "grid",

    "--timvir-page-margin": "16px",
    "--timvir-margin": "var(--timvir-page-margin)",

    gridAutoRows: "min-content",
    gridTemplateColumns: "[le] var(--timvir-page-margin) [lex lc] 1fr [rc rex] var(--timvir-page-margin) [re]",

    "@media (min-width: 48rem)": {
      "--timvir-page-margin": "24px",
      gridTemplateColumns:
        "[le] var(--timvir-page-margin) [lex] 1fr [lc] minmax(0, 48rem) [rc] 1fr [rex] var(--timvir-page-margin) [re]",
    },

    "@media (min-width: 72rem)": {
      gridTemplateColumns:
        "[le] 1fr var(--timvir-page-margin) [lex] minmax(0, 12rem) [lc] 48rem [rc] minmax(0, 12rem) [rex] var(--timvir-page-margin) 1fr [re]",
    },
  },

  block: {
    gridColumn: "lc / rc",
    minWidth: 0,

    margin: "0 0 2rem",
  },

  extendedWidth: {
    gridColumn: "lex / rex",
  },
  fullWidth: {
    gridColumn: "le / re",
  },
});

/**
 * @deprecated
 */
export const noLayout: string = "";

/**
 * @deprecated
 */
export const grid: string = "";

/**
 * @deprecated
 */
export const extendedWidth: string = "";

/**
 * @deprecated
 */
export const fullWidth: string = "";
