import { css, cx } from "linaria";

export const noLayout = css``;

export const grid = css`
  display: grid;

  margin: 0 16px;
  grid-template-columns: [le lc] 1fr [rc re];

  @media (min-width: 60rem) {
    margin: 0;
    grid-template-columns: [le] 1fr [lc] minmax(min-content, 48rem) [rc] 1fr [re];
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
