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
  ignoreTags: ["select"]
});

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentProps<typeof Root> {
  location: { pathname: string };
  toc: ReadonlyArray<Node>;
  Link: typeof Link;
}

function Page({ location, toc, Link, children, className, ...props }: Props, ref: any /* FIXME */) {
  const [search, setSearch] = React.useState(false);

  const keyMap = {
    SEARCH: "command+p",
    ESC: "escape"
  };

  const handlers = {
    SEARCH: ev => {
      ev.preventDefault();
      setSearch(x => !x);
    },
    ESC: () => {
      setSearch(false);
    }
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
            overflow-x: hidden;
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
            background: rgba(43, 188, 138, 0.16);
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

      {search && <Search toc={toc} />}
    </>
  );
}

export default React.forwardRef(Page);
