/**
 * This is documentation for the Code component.
 */

import Highlight, { defaultProps, Language } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/github";
import React from "react";
import { css, cx } from "linaria";
import * as Page from "../Page";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "pre";

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
  language?: Language;

  /**
   * When set, the code block spans the full width. Note that the text itself
   * is still aligned with the main column. Use this when you expect the text
   * to be wider than the center column.
   */
  fullWidth?: boolean;

  /**
   * The numbering starts at 1, ie. `highlightedLines={[1, 2]}` will highlight
   * the first two lines.
   */
  highlightedLines?: Array<number>;
}

function Code(props: Props, ref: any /* FIXME */) {
  const { children, language, fullWidth, highlightedLines, ...rest } = props;

  const isHighlightedLine = (() => {
    return (line: number) => highlightedLines?.includes(line);
  })();

  return (
    <Highlight {...defaultProps} code={children.trim()} language={language ?? "markup"} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Root
          ref={ref}
          {...rest}
          className={cx(
            className,
            css`
              margin: 0;
              overflow-x: auto;
            `,
            fullWidth && Page.fullWidth,
            fullWidth &&
              css`
                display: grid;

                grid-auto-rows: min-content;
                grid-template-columns: [le] 0 [lc] 1fr [rc] 0 [re];
                grid-column-gap: 16px;

                @media (min-width: 60rem) {
                  grid-template-columns: [le] 1fr [lc] minmax(0, 48rem) [rc] 1fr [re];
                  grid-column-gap: 24px;
                }

                & > * {
                  grid-column: lc / re;
                }
              `,
            !fullWidth &&
              css`
                border-radius: 3px;
              `
          )}
          style={style}
        >
          <div
            className={css`
              display: grid;
              grid-template-columns: 1fr;
            `}
          >
            <div
              className={cx(
                fullWidth
                  ? css`
                      padding: 16px 24px 16px 0;
                    `
                  : css`
                      padding: 16px 0;
                    `
              )}
            >
              {tokens.map((line, i) => {
                const { className, ...lineProps } = getLineProps({ line, key: i });

                return (
                  <div
                    {...lineProps}
                    className={cx(
                      className,
                      css`
                        padding: 0 24px;
                      `,
                      isHighlightedLine(i + 1) &&
                        css`
                          background: #fffbdd;
                        `
                    )}
                  >
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </Root>
      )}
    </Highlight>
  );
}

export default React.forwardRef(Code);
