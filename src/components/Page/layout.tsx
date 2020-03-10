import { css, cx } from "linaria";

export const noLayout = css``;

export const grid = css`
  display: grid;

  grid-auto-rows: min-content;
  grid-template-columns: [le] 0 [lc] 1fr [rc] 0 [re];
  grid-column-gap: 16px;

  @media (min-width: 60rem) {
    grid-template-columns: [le] 1fr [lc] minmax(0, 48rem) [rc] 1fr [re];
    grid-column-gap: 24px;
  }

  & > *:not(.${noLayout}) {
    grid-column: lc / rc;
  }
`;

export const fullWidth = cx(
  noLayout,
  css`
    grid-column: le / re;
  `
);
