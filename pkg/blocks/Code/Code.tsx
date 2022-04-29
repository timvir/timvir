/**
 * This is documentation for the Code component.
 */

import { css, cx } from "@linaria/core";
import * as Page from "@timvir/core";
import { useBlock } from "@timvir/core";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import * as React from "react";
import * as Icons from "react-feather";
import { useImmer } from "use-immer";
import { theme } from "./theme";

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

  caption?: React.ReactNode;
}

function Code(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const block = useBlock(props);

  const { children, language, fullWidth, highlightedLines, caption, ...rest } = block.props;

  const isHighlightedLine = (() => {
    return (line: number) => highlightedLines?.includes(line);
  })();

  const [state, mutate] = useImmer({
    mouseOver: false,
    copiedToClipboard: false,
  });

  return (
    <Root ref={ref} className={cx(classes.root, fullWidth && Page.fullWidth)} {...rest}>
      <Highlight {...defaultProps} code={children.trim()} language={language ?? "markup"} theme={theme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={cx(className, classes.code, fullWidth && classes.fullWidth)} style={style}>
            <div
              className={css`
                display: grid;
                grid-template-columns: 1fr;
                padding-block: 16px;
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
                    : css``
                )}
              >
                {tokens.map((line, i) => {
                  const { className, ...lineProps } = getLineProps({ line, key: i });

                  return (
                    <div
                      key={i}
                      {...lineProps}
                      className={cx(className, classes.line, isHighlightedLine(i + 1) && classes.highlightedLine)}
                    >
                      {/* <span className={classes.lineNumber}>{i + 1}</span> */}
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </pre>
        )}
      </Highlight>

      {caption && <div className={classes.caption}>{caption}</div>}
    </Root>
  );
}

export default React.forwardRef(Code);

const classes = {
  root: css`
    margin: 1.5rem 0 3rem;
  `,

  code: css`
    overflow-x: auto;
    contain: content;
    font-size: 0.9em;

    border-radius: 5px;

    --timvir-b-Code-bleed: var(--timvir-page-margin, 24px);
    --timvir-b-Code-inlinePadding: max(var(--timvir-b-Code-bleed), 24px);

    padding: 0;
    margin: 0 calc(-1 * var(--timvir-b-Code-bleed));

    box-shadow: inset 0 0 0 1px rgb(16 22 26 / 20%), 0 1px 4px rgb(16 22 26 / 10%);
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: inset 0 0 0 1px rgb(16 22 26 / 30%), 0 1px 4px rgb(16 22 26 / 10%), 0 8px 24px rgb(16 22 26 / 10%);
    }
  `,

  fullWidth: css`
    display: grid;

    border-radius: 0;
    box-shadow: none;

    margin-inline: 0;

    grid-auto-rows: min-content;
    grid-template-columns: [le] 0 [lc] 1fr [rc] 0 [re];
    grid-column-gap: 16px;

    &:hover {
      box-shadow: none;
    }

    @media (min-width: 60rem) {
      grid-template-columns: [le] 1fr [lc] minmax(0, 48rem) [rc] 1fr [re];
      grid-column-gap: 24px;
    }

    & > * {
      grid-column: lc / re;
    }
  `,

  line: css`
    padding-inline: var(--timvir-b-Code-inlinePadding);
    margin-inline: 1px;
  `,
  highlightedLine: css`
    background-color: #ffe10044;
  `,

  lineNumber: css`
    display: inline-block;
    width: var(--timvir-b-Code-bleed);
    color: var(--timvir-secondary-text-color);
    text-align: right;
    padding-inline: 4px;
  `,

  caption: css`
    font-size: 0.75rem;
    color: var(--timvir-secondary-text-color);
    margin-top: 2px;
  `,
};
