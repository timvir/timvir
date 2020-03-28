import { MDXProvider } from "@mdx-js/react";
import { css, cx } from "linaria";
import Link from "next/link";
import React from "react";
import { configure, GlobalHotKeys } from "react-hotkeys";
import * as mdxComponents from "./components";
import { Search, Sidebar } from "./internal";
import { grid } from "./layout";
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
}

function Page({ location, toc, Link, children, className, ...props }: Props, ref: any /* FIXME */) {
  const [search, setSearch] = React.useState(false);

  const keyMap = {
    SEARCH: "command+p",
    ESC: "escape",
  };

  const handlers = {
    SEARCH: (ev) => {
      ev.preventDefault();
      setSearch((x) => !x);
    },
    ESC: () => {
      setSearch(false);
    },
  };

  return (
    <>
      <GlobalHotKeys keyMap={keyMap} handlers={handlers} />

      <Root
        {...props}
        className={cx(
          className,
          css`
            font-family: "Menlo", "Meslo LG", monospace;
            font-feature-settings: "liga", "kern";
            text-rendering: optimizelegibility;
            font-size: 14px;
            line-height: 1.725;
            color: rgba(0, 0, 0, 0.85);
            min-height: 100vh;

            display: grid;
            grid-template-columns: [l] 0 [m] 1fr [r];

            @media (min-width: 60rem) {
              grid-template-columns: [l] 300px [m] 1fr [r];
            }

            --c-p-0: #f0fcf6;
            --c-p-1: #d1f6e4;
            --c-p-2: #a0dbc1;
            --c-p-3: #61c19f;
            --c-p-4: #38a585;
            --c-p-5: #1b896b;

            --c-gray-8: #303030;

            --c-text: var(--c-gray-8);
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
          <Sidebar location={location} toc={toc} Link={Link} />
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

      {search && <Search location={location} toc={toc} Link={Link} />}
    </>
  );
}

export default React.forwardRef(Page);
