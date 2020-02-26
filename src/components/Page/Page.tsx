import { MDXProvider } from "@mdx-js/react";
import { css, cx } from "linaria";
import { styled } from "linaria/react";
import Link from "next/link";
import * as React from "react";
import { Section } from "./internal";
import { Node } from "./types";

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
  return (
    <Component
      {...props}
      className={cx(
        className,
        css`
          display: grid;
          grid-template-columns: 1fr minmax(min-content, 48rem) 1fr;
          grid-gap: 24px;

          font-family: "Menlo", "Meslo LG", monospace;
          font-feature-settings: "liga", "kern";
          text-rendering: optimizelegibility;
          font-size: 14px;
          line-height: 1.725;
          color: #383838;
        `
      )}
    >
      <div>
        <aside
          className={css`
            padding-top: 50px;
            position: sticky;
            top: 0;
            padding-left: 24px;
          `}
        >
          <Search />

          <nav>
            {toc.map((c, i) => (
              <Section key={i} location={location} Link={Link} {...c} />
            ))}
          </nav>
        </aside>
      </div>

      <main>
        <MDXProvider components={mdxComponents}>{children}</MDXProvider>
      </main>
    </Component>
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
  `
};

const Search = () => (
  <div
    className={css`
      position: relative;
      margin: 0 0 1.5rem 1.2ch;
      z-index: 1;
      max-width: 280px;
    `}
  >
    <label
      className={css`
        width: 100%;
        display: inline-flex;
        align-items: center;
        transition: border 0.2s ease;
        border-radius: 2px;
        background: hsla(0, 0%, 0%, 0.075);
        font-family: "Menlo", "Meslo LG", monospace;
      `}
    >
      <input
        type="text"
        placeholder="Search or jump to…"
        className={css`
          width: 100%;
          height: 100%;
          font-size: 0.8rem;
          border: none;
          outline: 0;
          padding-right: 1rem;
          -moz-appearance: none;
          -webkit-appearance: none;
          background: none;
          font-family: "Menlo", "Meslo LG", monospace;
          padding: 10px 1.2ch;
        `}
      />
      <span
        className={css`
          flex-shrink: 0;
          display: block;
          color: rgba(0, 0, 0, 0.3);
          padding: 4px 5px;
          border: 1px solid currentColor;
          border-radius: 3px;
          font-size: 0.8rem;
          line-height: 1;
          margin-right: 8px;
        `}
      >
        /
      </span>
    </label>
  </div>
);
