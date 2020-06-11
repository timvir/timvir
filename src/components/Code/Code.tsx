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
}

function Code({ children, language, fullWidth, ...props }: Props, ref: any /* FIXME */) {
  return (
    <Highlight {...defaultProps} code={children.trim()} language={language ?? "markup"} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Root
          ref={ref}
          {...props}
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
              grid-template-columns: min-content;
            `}
          >
            <div
              className={cx(
                fullWidth
                  ? css`
                      padding: 16px 24px 16px 0;
                    `
                  : css`
                      padding: 16px 24px;
                    `
              )}
            >
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Root>
      )}
    </Highlight>
  );
}

export default React.forwardRef(Code);
