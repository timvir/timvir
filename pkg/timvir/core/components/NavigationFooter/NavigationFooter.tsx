import { css, cx } from "@linaria/core";
import * as React from "react";
import { useContext } from "timvir/context";

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

function NavigationFooter(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { prev, next, className, ...rest } = props;

  return (
    <Root
      ref={ref}
      {...rest}
      className={cx(
        className,
        css`
          padding: 50px 0;
          background: #282c34;
          color: white;

          display: grid;

          grid-auto-rows: min-content;
          grid-template-columns: [le] 16px [lex lc] 1fr [rc rex] 16px [re];

          @media (min-width: 48rem) {
            grid-template-columns: [le] 24px [lex] 1fr [lc] minmax(0, 48rem) [rc] 1fr [rex] 24px [re];
          }

          @media (min-width: 72rem) {
            grid-template-columns: [le] 1fr 24px [lex] minmax(0, 12rem) [lc] 48rem [rc] minmax(0, 12rem) [rex] 24px 1fr [re];
          }

          & > * {
            grid-column: lc / rc;
          }
        `
      )}
    >
      <div
        className={css`
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
        `}
      >
        <div
          className={css`
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            text-align: left;
          `}
        >
          {prev && (
            <>
              <SecondaryLabel>{prev.context || "/"}</SecondaryLabel>
              <PrimaryLink href={prev.href}>{prev.label}</PrimaryLink>
            </>
          )}
        </div>
        <div
          className={css`
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            @media (min-width: 48rem) {
              align-items: flex-end;
              text-align: right;
            }
          `}
        >
          {next && (
            <>
              <SecondaryLabel>{next.context || "/"}</SecondaryLabel>
              <PrimaryLink href={next.href}>{next.label}</PrimaryLink>
            </>
          )}
        </div>
      </div>
    </Root>
  );
}

export default React.forwardRef(NavigationFooter);

const PrimaryLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const { Link } = useContext();

  return (
    <Link
      href={href}
      className={css`
        font-size: 1.2rem;
        color: inherit;
        text-decoration: none;

        &:hover {
          color: var(--c-p-3);
        }
      `}
    >
      {children}
    </Link>
  );
};

const SecondaryLabel = ({ children }: { children?: React.ReactNode }) => (
  <div
    className={css`
      opacity: 0.5;
    `}
  >
    {children}
  </div>
);
