import { css, cx } from "linaria";

export const noLayout = css``;

export const grid = css`
  display: grid;

  grid-auto-rows: min-content;
  grid-template-columns: [le] 16px [lex lc] 1fr [rc rex] 16px [re];

  @media (min-width: 48rem) {
    grid-template-columns: [le] 24px [lex] 1fr [lc] minmax(0, 48rem) [rc] 1fr [rex] 24px [re];
  }

  @media (min-width: 72rem) {
    grid-template-columns: [le] 1fr 24px [lex] minmax(0, 12rem) [lc] 48rem [rc] minmax(0, 12rem) [rex] 24px 1fr [re];
  }

  & > *:not(.${noLayout}) {
    grid-column: lc / rc;
  }
`;

export const extendedWidth = cx(
  noLayout,
  css`
    grid-column: lex / rex;
  `
);

export const fullWidth = cx(
  noLayout,
  css`
    grid-column: le / re;
  `
);
