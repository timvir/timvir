import { css, cx } from "@linaria/core";

export const noLayout: string = css``;

export const grid: string = css`
  display: grid;

  --timvir-page-margin: 16px;
  --timvir-margin: var(--timvir-page-margin);

  grid-auto-rows: min-content;
  grid-template-columns: [le] var(--timvir-page-margin) [lex lc] 1fr [rc rex] var(--timvir-page-margin) [re];

  @media (min-width: 48rem) {
    --timvir-page-margin: 24px;
    grid-template-columns: [le] var(--timvir-page-margin) [lex] 1fr [lc] minmax(0, 48rem) [rc] 1fr [rex] var(
        --timvir-page-margin
      ) [re];
  }

  @media (min-width: 72rem) {
    grid-template-columns: [le] 1fr var(--timvir-page-margin) [lex] minmax(0, 12rem) [lc] 48rem [rc] minmax(0, 12rem) [rex] var(
        --timvir-page-margin
      ) 1fr [re];
  }

  & > *:not(.${noLayout}) {
    grid-column: lc / rc;
    min-width: 0;
  }

  & > * {
    margin: 0 0 2rem;
  }

  & > p + ul {
    margin-top: -1.25rem;
  }
`;

export const extendedWidth: string = cx(
  noLayout,
  css`
    grid-column: lex / rex;
  `
);

export const fullWidth: string = cx(
  noLayout,
  css`
    grid-column: le / re;
  `
);
