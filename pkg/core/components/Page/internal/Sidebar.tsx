import { css, cx } from "@linaria/core";
import * as React from "react";
import { useImmer } from "use-immer";
import { Node } from "../types";
import Section from "./Section";

interface Props {
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

function Sidebar({ toc, search }: Props) {
  const [state, mutate] = useImmer({
    shadowVisible: false,
  });

  const onScroll = (ev: React.SyntheticEvent<HTMLDivElement>) => {
    const shadowVisible = ev.currentTarget.scrollTop > 2;
    if (state.shadowVisible !== shadowVisible) {
      mutate((draft) => {
        draft.shadowVisible = shadowVisible;
      });
    }
  };

  return (
    <aside
      className={cx(
        css`
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 0;

          @media (min-width: 60rem) {
            width: 300px;
          }
        `
      )}
    >
      <div
        className={css`
          display: none;
          height: 0;

          @media (min-width: 60rem) {
            display: flex;
            flex-direction: column;
            height: 100%;
          }
        `}
      >
        {search && (
          <div
            className={cx(
              css`
                padding: 24px 3px 24px;
                flex-shrink: 0;
                transition: all 0.16s;
              `,
              state.shadowVisible &&
                css`
                  box-shadow: 0 1px 0 rgba(16, 22, 26, 0.15);
                `
            )}
          >
            <Search {...search} />
          </div>
        )}

        <div
          className={css`
            padding: 24px 3px 30px;
            overflow-y: auto;
            flex-grow: 1;
            overscroll-behavior: contain;
          `}
          onScroll={onScroll}
        >
          <nav>
            {toc.map((c, i) => (
              <Section key={i} depth={0} {...c} />
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

const Search = ({ open, label }: NonNullable<Props["search"]>) => {
  return (
    <div
      className={css`
        font-family: system-ui;
      `}
    >
      <div
        role="button"
        className={css`
          color: var(--c-text);
          font-size: 14px;
          font-weight: 500;
          line-height: 1.725;
          cursor: pointer;
          padding: 2px 24px;
          border-radius: 3px;

          display: flex;
          align-items: center;

          &:hover {
            background: var(--c-p-1);
          }

          & > svg {
            display: block;
            margin-right: 4px;
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
        {label || "Quick Find"}
      </div>
    </div>
  );
};
