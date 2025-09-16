"use client";

/**
 * This is documentation for the Code component.
 */

import { cx } from "../../internal/cx";
import * as stylex from "@stylexjs/stylex";
import { useBlock } from "timvir/core";
import { layoutStyles } from "../../core/layout";
import { codeToHtml, ShikiTransformer } from "shiki";
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
    html: `<pre class="${stylex.props(styles.pre).className}"><code>${children
      .trim()
      .split("\n")
      .map(() => "\n")
      .join("")}</code></pre>`,
  });

  React.useEffect(() => {
    (async () => {
      const stylexTransformer: ShikiTransformer = {
        name: "stylex",

        pre(node) {
          this.addClassToHast(node, stylex.props(styles.pre).className!);
        },

        line(node, index) {
          this.addClassToHast(node, stylex.props(styles.line).className!);

          if (highlightedLines?.includes(index)) {
            this.addClassToHast(node, stylex.props(styles.highlightedLine).className!);
          }
        },
      };

      const html = await codeToHtml(children.trim(), {
        lang: language ?? "text",

        themes: {
          light: "github-light",
          dark: "github-dark",
        },
        defaultColor: false,
        cssVariablePrefix: "--timvir-b-Code-shiki-",

        transformers: [stylexTransformer],
      });

      setState((state) => ({
        ...state,
        settled: true,
        html,
      }));
    })();
  }, [children, language, highlightedLines]);

  const rootStyleProps = stylex.props(layoutStyles.block);
  const codeStyleProps = stylex.props(styles.code);
  const captionStyleProps = stylex.props(styles.caption);

  return (
    <Root
      ref={ref}
      {...rest}
      {...rootStyleProps}
      className={cx("timvir-b-Code", !state.settled && "timvir-unsettled", className, rootStyleProps.className)}
      style={{ ...rootStyleProps.style, ...rest.style }}
    >
      <div
        {...codeStyleProps}
        className={cx("timvir-b-Code-container", codeStyleProps.className)}
        dangerouslySetInnerHTML={{ __html: state.html }}
      />

      {caption && (
        <div {...captionStyleProps} className={cx("timvir-b-Code-caption", captionStyleProps.className)}>
          {caption}
        </div>
      )}
    </Root>
  );
}

export default React.forwardRef(Code);

const styles = stylex.create({
  code: {
    overflowX: "auto",
    contain: "content",
    fontSize: "0.8em",
    borderRadius: "5px",

    "--timvir-b-Code-bleed": "calc(var(--timvir-margin, 0px) * 0.6666)",
    "--timvir-b-Code-inlinePadding": "max(var(--timvir-b-Code-bleed), 8px)",

    padding: 0,
    margin: "0 calc(-1 * var(--timvir-b-Code-bleed))",

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--timvir-border-color)",

    backgroundColor: "var(--timvir-secondary-background-color)",
  },

  pre: {
    display: "block",
    margin: 0,
    padding: "16px 0",
    backgroundColor: "var(--timvir-secondary-background-color)",
  },

  line: {
    display: "inline-block",
    width: "100%",
    paddingInline: "var(--timvir-b-Code-inlinePadding)",
  },

  highlightedLine: {
    backgroundColor: "var(--timvir-highlight-background-color)",
  },

  caption: {
    fontSize: "0.8125rem",
    lineHeight: 1.1875,
    color: "var(--timvir-secondary-text-color)",
    marginTop: "0.3em",
  },
});
