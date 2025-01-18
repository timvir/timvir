import { css, cx } from "@linaria/core";
import * as React from "react";
import { useContext } from "timvir/context";
import * as Icons from "react-feather";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  prev?: {
    href: string;
    label: React.ReactNode;
    context: React.ReactNode;
  };
  next?: {
    href: string;
    label: React.ReactNode;
    context: React.ReactNode;
  };
}

function NavigationFooter(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const { Link } = useContext();

  const { prev, next, className, ...rest } = props;

  return (
    <Root ref={ref} {...rest} className={cx(className, classes.root)}>
      <div
        className={css`
          display: flex;
          flex-direction: column-reverse;
          gap: 1rem;

          font-size: 0.875rem;
          line-height: 1.5;

          @media (min-width: 48rem) {
            flex-direction: row;
          }
        `}
      >
        {prev && (
          <Link
            href={prev.href}
            className={css`
              width: 100%;
              display: flex;
              gap: 4px;
              flex-direction: column;
              align-items: flex-start;
              justify-content: flex-end;
              text-align: left;
              border-radius: 8px;
              border: 1px solid var(--timvir-border-color);
              padding: 16px;

              color: inherit;
              text-decoration: none;

              min-width: 0;

              &:hover {
                background-color: var(--timvir-secondary-background-color);
              }
            `}
          >
            <Context>
              <Icons.ChevronLeft /> Previous
            </Context>
            <Label>{prev.label}</Label>
          </Link>
        )}
        {next && (
          <Link
            href={next.href}
            className={css`
              width: 100%;
              display: flex;
              flex-direction: column;
              gap: 4px;
              align-items: flex-end;
              justify-content: flex-start;
              text-align: right;
              border-radius: 8px;
              border: 1px solid var(--timvir-border-color);
              padding: 16px;

              color: inherit;
              text-decoration: none;

              min-width: 0;

              &:hover {
                background-color: var(--timvir-secondary-background-color);
              }
            `}
          >
            <>
              <Context>
                Next <Icons.ChevronRight />
              </Context>
              <Label>{next.label}</Label>
            </>
          </Link>
        )}
      </div>
    </Root>
  );
}

export default React.forwardRef(NavigationFooter);

function Label(props: { children: React.ReactNode }) {
  return (
    <div
      className={css`
        font-weight: 500;

        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
      `}
      {...props}
    />
  );
}

function Context(props: { children?: React.ReactNode }) {
  return (
    <div
      className={css`
        color: var(--timvir-secondary-text-color);
        display: flex;
        align-items: center;
        margin-inline: -0.2em;

        svg {
          height: 1.2em;
          width: 1.2em;
        }
      `}
      {...props}
    />
  );
}

const classes = {
  root: css`
    padding: 50px 0 80px;

    display: grid;

    grid-auto-rows: min-content;
    grid-template-columns: [le] var(--timvir-page-margin) [lex lc] 1fr [rc rex] var(--timvir-page-margin) [re];

    @media (min-width: 48rem) {
      grid-template-columns:
        [le] var(--timvir-page-margin) [lex] 1fr [lc] minmax(0, 48rem) [rc] 1fr [rex] var(--timvir-page-margin)
        [re];
    }

    @media (min-width: 72rem) {
      grid-template-columns:
        [le] 1fr var(--timvir-page-margin) [lex] minmax(0, 12rem) [lc] 48rem [rc] minmax(0, 12rem) [rex] var(
          --timvir-page-margin
        )
        1fr [re];
    }

    & > * {
      grid-column: lc / rc;
    }
  `,
};
