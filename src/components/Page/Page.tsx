import { MDXProvider } from "@mdx-js/react";
import { css, cx } from "linaria";
import Link from "next/link";
import React from "react";
import { configure, GlobalHotKeys } from "react-hotkeys";
import { useImmer } from "use-immer";
import * as mdxComponents from "./components";
import { Sidebar } from "./internal";
import { grid } from "./layout";
import { theme } from "./theme";
import { Node } from "./types";

configure({
  ignoreTags: ["select"],
});

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentProps<typeof Root> {
  location: { asPath: string; push: (path: string) => void };
  toc: readonly Node[];
  Link: typeof Link;

  search?: {
    label?: React.ReactNode;
    Component: React.ComponentType<{ open: boolean }>;
  };
}

function Page({ location, toc, Link, children, className, search, ...props }: Props, ref: any /* FIXME */) {
  const [state, mutate] = useImmer({
    search: {
      open: false,
    },
  });

  const keyMap = {
    SEARCH: "command+p",
    ESC: "escape",
  };

  const handlers = {
    SEARCH: (ev) => {
      ev.preventDefault();
      mutate((draft) => {
        draft.search.open = !draft.search.open;
      });
    },
    ESC: () => {
      mutate((draft) => {
        draft.search.open = false;
      });
    },
  };

  return (
    <>
      <GlobalHotKeys keyMap={keyMap} handlers={handlers} />

      <Root
        ref={ref}
        {...props}
        className={cx(
          className,
          theme,
          css`
            min-height: 100vh;

            display: grid;
            grid-template-columns: [l] 0 [m] 1fr [r];

            @media (min-width: 60rem) {
              grid-template-columns: [l] 300px [m] 1fr [r];
            }
          `
        )}
      >
        <div
          className={css`
            background: var(--c-p-0);
            border-right: 1px solid rgba(43, 188, 138, 0.1);
            grid-column: l / m;
          `}
        >
          <Sidebar
            location={location}
            toc={toc}
            Link={Link}
            search={{
              open: () => {
                mutate((draft) => {
                  draft.search.open = true;
                });
              },
              ...search,
            }}
          />
        </div>

        <div
          className={cx(
            grid,
            css`
              grid-column: m / r;
            `
          )}
        >
          <MDXProvider components={mdxComponents}>{children}</MDXProvider>
        </div>
      </Root>

      {search && <search.Component {...state.search} />}
    </>
  );
}

export default React.forwardRef(Page);
