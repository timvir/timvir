/**
 * This is documentation for the Code component.
 */

import { css, cx } from "@linaria/core";
import * as Page from "timvir/core";
import { useBlock } from "timvir/core";
import { codeToHtml } from "shiki";
import * as React from "react";
import * as Icons from "react-feather";
import { useImmer } from "use-immer";
import theme from "./theme";

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

  const { children, language, fullWidth, highlightedLines, caption, className, ...rest } = block.props;

  const [state, mutate] = useImmer({
    mouseOver: false,
    copiedToClipboard: false,
    html: "",
  });

  React.useEffect(() => {
    (async () => {
      const html = await codeToHtml(children.trim(), {
        lang: language ?? "text",

        themes: {
          light: "github-light",
          dark: "github-dark",
        },

        decorations: (highlightedLines ?? []).map((line) => ({
          start: { line: line - 1, character: 0 },
          end: { line: line, character: 0 },
          properties: { class: classes.highlightedLine },
        })),
      });

      mutate((draft) => {
        draft.html = html;
      });
    })();
  }, [mutate, children, language]);

  return (
    <Root ref={ref} className={cx(classes.root, fullWidth && Page.fullWidth)} {...rest}>
      <div className={cx(className, theme, classes.code, fullWidth && classes.fullWidth)}>
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
                overflow: hidden;

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
            dangerouslySetInnerHTML={{ __html: state.html }}
          />
        </div>
      </div>

      {caption && <div className={classes.caption}>{caption}</div>}
    </Root>
  );
}

export default React.forwardRef(Code);

const classes = {
  root: css`
    margin: 1.5rem 0 3rem;

    :global(:root[data-timvir-theme="dark"]) & {
      .shiki,
      .shiki span {
        color: var(--shiki-dark) !important;
        font-style: var(--shiki-dark-font-style) !important;
        font-weight: var(--shiki-dark-font-weight) !important;
        text-decoration: var(--shiki-dark-text-decoration) !important;
      }
    }
  `,

  code: css`
    overflow-x: auto;
    contain: content;
    font-size: 0.8em;

    border-radius: 5px;

    --timvir-b-Code-bleed: calc(var(--timvir-page-margin, 24px) * 0.6666);
    --timvir-b-Code-inlinePadding: max(var(--timvir-b-Code-bleed), 8px);

    padding: 0;
    margin: 0 calc(-1 * var(--timvir-b-Code-bleed));

    border: 1px solid var(--timvir-border-color);

    & pre {
      margin: 0;
      padding: 16px 0;

      background-color: var(--timvir-secondary-background-color) !important;
    }

    & pre code {
      display: block;
    }
    & pre code .line {
      display: inline-block;
      position: relative;
      width: 100%;
    }

    & pre .line {
      padding-inline: var(--timvir-b-Code-inlinePadding);
      margin-inline: 1px;
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

    :global(:root[data-timvir-theme="dark"]) & {
      background-color: rgba(174, 124, 20, 0.15);
    }
  `,

  lineNumber: css`
    display: inline-block;
    width: var(--timvir-b-Code-bleed);
    color: var(--timvir-secondary-text-color);
    text-align: right;
    padding-inline: 4px;
  `,

  caption: css`
    font-size: 0.8125rem;
    line-height: 1.1875;
    color: var(--timvir-secondary-text-color);
    margin-top: 2px;
  `,
};
