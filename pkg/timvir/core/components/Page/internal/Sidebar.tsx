import { css, cx } from "@linaria/core";
import * as React from "react";
import { Node } from "../types";
import Section from "./Section";
import * as Icons from "react-feather";
import { useContext } from "timvir/context";

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
  const { location } = useContext();

  const { toc, search, className, ...rest } = props;

  const node = (function find(nodes: readonly Node[]): undefined | Node {
    for (const node of nodes) {
      if (node.children) {
        const n = find(node.children);
        if (n) {
          return n;
        }
      }
    }

    for (const node of nodes) {
      if (node.path && location.asPath.startsWith(node.path)) {
        return node;
      }
    }
  })(toc);

  return (
    <nav className={cx(className, classes.root)} {...rest}>
      <header
        className={css`
          padding: 0 var(--timvir-page-margin);
          height: 3rem;
          display: flex;
          align-items: center;

          @media (min-width: 48rem) {
            padding-top: 24px;
            display: block;
            height: auto;
          }
        `}
      >
        <div
          className={css`
            font-size: 0.875rem;
            line-height: 1.3125;

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
              height: 1.25rem;
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
                margin-top: 16px;
                display: none;

                @media (min-width: 48rem) {
                  display: block;
                }
              `
            )}
          >
            <Search {...search} />
          </div>
        )}
      </header>

      <label
        htmlFor="menu"
        className={css`
          border-bottom: 1px solid var(--timvir-border-color);
          padding: 0 var(--timvir-page-margin);
          height: 3rem;
          display: flex;
          align-items: center;
          cursor: pointer;

          @media (min-width: 48rem) {
            display: none;
          }
        `}
      >
        {node?.icon
          ? React.cloneElement(node.icon, {
              className: css`
                display: block;
                width: 1.3em;
                height: 1.3em;
                margin-right: 8px;
                min-width: 1.3em;
              `,
            })
          : null}
        <span>{node?.label ?? "Menu"}</span>

        <Icons.Menu
          size={16}
          className={css`
            margin-left: auto;
          `}
        />
      </label>

      <input
        type="checkbox"
        id="menu"
        className={css`
          display: none;
        `}
        onChange={(ev) => {
          document.body.classList.toggle(classes.scrollLock, ev.currentTarget.checked);
        }}
      />
      <div className={classes.content}>
        <div className={classes.sections}>
          <div
            className={classes.nav}
            onClick={() => {
              document.body.classList.remove(classes.scrollLock);
            }}
          >
            {toc.map((c, i) => (
              <Section key={i} depth={0} {...c} />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;

const classes = {
  scrollLock: css`
    overflow-y: scroll;
    position: fixed;
    top: 0px;
    width: 100%;
  `,

  root: css`
    display: flex;
    flex-direction: column;

    @media (min-width: 48rem) {
      height: 100%;
    }
  `,

  content: css`
    display: none;
    background-color: var(--timvir-background-color);

    #menu:checked ~ & {
      display: flex;
      position: fixed;
      top: 6rem;
      left: 0;
      right: 0;
      bottom: 0;
    }

    @media (min-width: 48rem) {
      display: flex;
      flex-direction: column;
      height: 100%;
      position: static;
      overflow: hidden;
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
    padding-inline: calc(var(--timvir-page-margin) - 8px);
    @media (min-width: 48rem) {
      padding-inline: var(--timvir-page-margin);
    }
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
          min-height: 36px;
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
            width: 0.75rem;
            height: 0.75rem;
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
