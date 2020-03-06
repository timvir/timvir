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
const Component = "div";

/**
 * TODO: Document Me!
 */
interface Props extends React.ComponentProps<typeof Component> {
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

      <Component
        {...props}
        className={cx(
          className,
          grid,
          css`
            font-family: "Menlo", "Meslo LG", monospace;
            font-feature-settings: "liga", "kern";
            text-rendering: optimizelegibility;
            font-size: 14px;
            line-height: 1.725;
            color: #383838;
            overflow-x: hidden;
            min-height: 100vh;
          `
        )}
      >
        <Sidebar location={location} toc={toc} Link={Link} />
        <MDXProvider components={mdxComponents}>{children}</MDXProvider>
      </Component>

      {search && <Search toc={toc} />}
    </>
  );
}

export default React.forwardRef(Page);
