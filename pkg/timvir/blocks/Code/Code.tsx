"use client";

/**
 * This is documentation for the Code component.
 */

import { css, cx } from "@linaria/core";
import * as stylex from "@stylexjs/stylex";
import { useBlock } from "timvir/core";
import { codeToHtml } from "shiki";
import * as React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  /**
   * The code that should be highlighted.
   */
  children: string;

  /**
   * Language in which the code is.
   *
   * @default "markup"
   */
  language?: string;

  /**
   * The numbering starts at 1, ie. `highlightedLines={[1, 2]}` will highlight
   * the first two lines.
   */
  highlightedLines?: Array<number>;

  caption?: React.ReactNode;
}

function Code(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const block = useBlock(props);

  const { children, language, highlightedLines, caption, className, ...rest } = block.props;

  const [state, setState] = React.useState({
    settled: false,

    /*
     * Prevent layout shift during (asynchronous) highlighting of the markup by
     * initializing the html with a pre/code block with the expected number of
     * lines.
     */
    html: `<pre><code>${children
      .trim()
      .split("\n")
      .map(() => "\n")
      .join("")}</code></pre>`,
  });

  React.useEffect(() => {
    (async () => {
      const html = await codeToHtml(children.trim(), {
        lang: language ?? "text",

        themes: {
          light: "github-light",
          dark: "github-dark",
        },
        defaultColor: false,

        decorations: (highlightedLines ?? []).map((line) => ({
          start: { line: line - 1, character: 0 },
          end: { line: line, character: 0 },
          properties: { class: classes.highlightedLine },
        })),
      });

      setState((state) => ({
        ...state,
        settled: true,
        html,
      }));
    })();
  }, [children, language, highlightedLines]);

  const captionStyleProps = stylex.props(styles.caption);

  return (
    <Root ref={ref} className={cx("timvir-b-Code", !state.settled && "timvir-unsettled", className)} {...rest}>
      <div className={cx("timvir-b-Code-container", classes.code)} dangerouslySetInnerHTML={{ __html: state.html }} />

      {caption && (
        <div {...captionStyleProps} className={cx("timvir-b-Code-caption", captionStyleProps.className)}>
          {caption}
        </div>
      )}
    </Root>
  );
}

export default React.forwardRef(Code);

const classes = {
  code: css`
    overflow-x: auto;
    contain: content;
    font-size: 0.8em;

    border-radius: 5px;

    --timvir-b-Code-bleed: calc(var(--timvir-margin, 0px) * 0.6666);
    --timvir-b-Code-inlinePadding: max(var(--timvir-b-Code-bleed), 8px);

    padding: 0;
    margin: 0 calc(-1 * var(--timvir-b-Code-bleed));

    border: 1px solid var(--timvir-border-color);
    background-color: var(--timvir-secondary-background-color);

    & .shiki {
      margin: 0;
      padding: 16px 0;
      background-color: var(--timvir-secondary-background-color) !important;
    }

    & .shiki .line {
      display: inline-block;
      width: 100%;
      padding-inline: var(--timvir-b-Code-inlinePadding);
    }

    & .shiki span {
      color: var(--shiki-light) !important;
      font-style: var(--shiki-light-font-style) !important;
      font-weight: var(--shiki-light-font-weight) !important;
      text-decoration: var(--shiki-light-text-decoration) !important;
    }

    :root[data-timvir-theme="dark"] & {
      .shiki span {
        color: var(--shiki-dark) !important;
        font-style: var(--shiki-dark-font-style) !important;
        font-weight: var(--shiki-dark-font-weight) !important;
        text-decoration: var(--shiki-dark-text-decoration) !important;
      }
    }
  `,

  highlightedLine: css`
    background-color: var(--timvir-highlight-background-color);
  `,
};

const styles = stylex.create({
  caption: {
    fontSize: "0.8125rem",
    lineHeight: 1.1875,
    color: "var(--timvir-secondary-text-color)",
    marginTop: "0.3em",
  },
});
