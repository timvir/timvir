import { MDXProvider } from "@mdx-js/react";
import { css, cx } from "linaria";
import Link from "next/link";
import Highlight, { defaultProps } from "prism-react-renderer";
import * as React from "react";
import { configure, GlobalHotKeys } from "react-hotkeys";
import { Search, Sidebar } from "./internal";
import { grid } from "./layout";
import { Node } from "./types";
import { styled } from "linaria/react";

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
  toc: Node[];
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

const mdxComponents = {
  h1: styled.h1`
    display: block;
    margin-top: 3rem;
    margin-bottom: 1rem;
    color: #2bbc8a;
    letter-spacing: 0.01em;
    font-weight: 700;
    font-style: normal;
    font-size: 1.5em;
    text-indent: -0.05em;
  `,
  h2: styled.h2`
    position: relative;
    display: block;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
    color: #383838;
    text-transform: none;
    letter-spacing: normal;
    font-weight: bold;
    font-size: 1rem;

    &::before {
      position: absolute;
      top: -4px;
      left: -1.2rem;
      color: #2bbc8a;
      content: "#";
      font-weight: bold;
      font-size: 1.2rem;
    }
  `,
  h3: styled.h3`
    position: relative;
    display: block;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
    color: #383838;
    text-transform: none;
    letter-spacing: normal;
    font-weight: bold;
    font-size: 0.9rem;

    &::before {
      position: absolute;
      top: -3px;
      left: -1rem;
      color: #2bbc8a;
      content: "#";
      font-weight: bold;
      font-size: 1.1rem;
    }
  `,
  h4: styled.h3`
    position: relative;
    display: block;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
    color: #383838;
    text-transform: none;
    letter-spacing: normal;
    font-weight: normal;
    font-size: 0.9rem;

    &::before {
      position: absolute;
      top: -3px;
      left: -1rem;
      color: #2bbc8a;
      content: "#";
      font-weight: bold;
      font-size: 1.1rem;
    }
  `,
  a: styled.a`
    color: #383838;
    text-decoration: none;
    background-image: linear-gradient(transparent, transparent 5px, #383838 5px, #383838);
    background-position: bottom;
    background-size: 100% 6px;
    background-repeat: repeat-x;

    &:hover {
      background-image: linear-gradient(transparent, transparent 3px, #2bbc8a 3px, #2bbc8a);
    }
  `,
  blockquote: styled.blockquote`
    margin-left: 0;
    font-size: 1.1rem;

    & > *:first-child {
      margin-top: 0;
    }
    & > *:last-child {
      margin-bottom: 0;
    }
  `,
  code: props => {
    return (
      <Highlight {...defaultProps} code={props.children.trim()} language="jsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cx(
              className,
              css`
                padding: 16px 24px;
              `
            )}
            style={style}
          >
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    );
  }
};
