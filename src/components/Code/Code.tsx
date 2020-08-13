/**
 * This is documentation for the Code component.
 */

import { css, cx } from "linaria";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/github";
import React from "react";
import * as Icons from "react-feather";
import { useImmer } from "use-immer";
import * as Page from "@timvir/core";

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

  const [state, mutate] = useImmer({
    mouseOver: false,
    copiedToClipboard: false,
  });

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
              contain: content;
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
            onMouseEnter={() => {
              mutate((draft) => {
                draft.mouseOver = true;
              });
            }}
            onMouseLeave={() => {
              mutate((draft) => {
                draft.mouseOver = false;
                draft.copiedToClipboard = false;
              });
            }}
          >
            <button
              onClick={() => {
                navigator.clipboard.writeText(children);
                mutate((draft) => {
                  draft.copiedToClipboard = true;
                });
              }}
              className={cx(
                css`
                  --size: 48px;

                  z-index: 1;
                  position: absolute;
                  top: 0;
                  right: 0;

                  width: var(--size);
                  height: var(--size);

                  display: flex;
                  align-items: flex-start;
                  justify-content: flex-end;

                  outline: none;
                  border: none;
                  padding: 6px;
                  background: transparent;

                  transition: all 0.2s;

                  cursor: pointer;

                  &:hover {
                    color: white;
                  }
                  &:hover svg:first-child {
                    transform: translate(0, 0);
                  }
                  &:active svg:first-child {
                    transform: translate(2px, -2px);
                  }

                  pointer-events: none;
                  opacity: 0;
                `,
                state.mouseOver &&
                  css`
                    pointer-events: all;
                    opacity: 1;
                  `
              )}
            >
              <svg
                width={48}
                height={48}
                viewBox="0 0 48 48"
                className={css`
                  position: absolute;
                  z-index: -1;
                  top: 0;
                  right: 0;
                  path {
                    fill: var(--c-p-4);
                  }

                  transition: all 0.2s;
                  transform: translate(48px, -48px);
                `}
              >
                <path d="M0 0 H48 V48 Z" />
              </svg>
              {state.copiedToClipboard ? <Icons.Clipboard size={"16px"} /> : <Icons.Copy size={"16px"} />}
            </button>

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
