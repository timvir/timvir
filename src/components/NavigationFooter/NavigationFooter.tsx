import { css, cx } from "linaria";
import type Link from "next/link";
import React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  Link: typeof Link;

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

function NavigationFooter({ prev, next, Link, className, ...props }: Props, ref: any /* FIXME */) {
  return (
    <Root
      ref={ref}
      {...props}
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
              <PrimaryLink Link={Link} href={prev.href}>
                {prev.label}
              </PrimaryLink>
            </>
          )}
        </div>
        <div
          className={css`
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: flex-start;
            text-align: right;
          `}
        >
          {next && (
            <>
              <SecondaryLabel>{next.context || "/"}</SecondaryLabel>
              <PrimaryLink Link={Link} href={next.href}>
                {next.label}
              </PrimaryLink>
            </>
          )}
        </div>
      </div>
    </Root>
  );
}

export default React.forwardRef(NavigationFooter);

const PrimaryLink = ({ href, Link, children }: { href: string; Link: Props["Link"]; children: React.ReactNode }) => {
  return (
    <Link href={href}>
      <a
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
      </a>
    </Link>
  );
};

const SecondaryLabel = ({ children }) => (
  <div
    className={css`
      opacity: 0.5;
    `}
  >
    {children}
  </div>
);
