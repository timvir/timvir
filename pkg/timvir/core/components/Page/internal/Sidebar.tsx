import { css, cx } from "@linaria/core";
import * as React from "react";
import { Node } from "../types";
import Section from "./Section";

interface Props extends React.ComponentPropsWithoutRef<"nav"> {
  toc: readonly Node[];

  search?: {
    open: () => void;
    label?: React.ReactNode;
    Component: React.ComponentType<{
      open: boolean;
      onClose: (ev: React.SyntheticEvent<HTMLElement>) => void;
    }>;
  };
}

function Sidebar(props: Props) {
  const { toc, search, className, ...rest } = props;

  return (
    <nav
      className={cx(
        className,
        classes.root,
        css`
          display: none;
          height: 0;

          @media (min-width: 60rem) {
            display: flex;
            flex-direction: column;
            height: 100%;
          }
        `
      )}
      {...rest}
    >
      <header
        className={css`
          padding: 24px 24px 0;
        `}
      >
        <div
          className={css`
            font-size: 0.875rem;
            line-height: 1.3125;
            margin-bottom: 16px;

            display: flex;
            gap: 16px;
          `}
        >
          <div
            className={css`
              font-weight: 590;
            `}
          >
            Timvir
          </div>
          <div
            className={css`
              background-color: var(--timvir-border-color);
              width: 1px;
              height: 20px;
            `}
          />
          <div>Docs</div>
        </div>

        {search && (
          <div
            className={cx(
              css`
                flex-shrink: 0;
                transition: all 0.16s;
              `
            )}
          >
            <Search {...search} />
          </div>
        )}
      </header>

      <div className={classes.sections}>
        <nav className={classes.nav}>
          {toc.map((c, i) => (
            <Section key={i} depth={0} {...c} />
          ))}
        </nav>
      </div>
    </nav>
  );
}

export default Sidebar;

const classes = {
  root: css`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 0;

    @media (min-width: 60rem) {
      width: 300px;
    }
  `,

  sections: css`
    padding: 24px 0;
    overflow-y: auto;
    flex-grow: 1;
    overscroll-behavior: auto;

    scroll-padding-block: 24px;
    mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.2) 12px,
      #000 24px,
      #000 calc(100% - 24px),
      rgba(0, 0, 0, 0.2) calc(100% - 12px),
      transparent 100%
    );
  `,

  nav: css`
    padding-inline: 24px;
  `,
};

function Search(props: NonNullable<Props["search"]>) {
  const { open, label } = props;

  return (
    <div
      className={css`
        font-family: system-ui;
      `}
    >
      <div
        role="button"
        className={css`
          color: var(--timvir-text-color);
          font-size: 0.8125rem;
          line-height: 2.2;
          font-weight: 400;
          cursor: pointer;
          height: 36px;
          border-radius: 8px;
          padding: 0 12px;
          border: 1px solid var(--timvir-border-color);
          background: var(--timvir-secondary-background-color);

          display: flex;
          align-items: center;

          &:hover {
            background: var(--timvir-sidebar-highlight-color);
          }

          & > svg {
            display: block;
            margin-right: 8px;
          }
        `}
        onClick={open}
      >
        <svg x="0px" y="0px" width="12px" height="12px" viewBox="0 0 12 12">
          <path
            d="M11.707 10.293l-2.54-2.54a5.015 5.015 0 10-1.414 1.414l2.54 2.54a1 1 0 001.414-1.414zM2 5a3 3 0 113 3 3 3 0 01-3-3z"
            fill="currentColor"
          />
        </svg>
        {label || "Search docs"}
      </div>
    </div>
  );
}
