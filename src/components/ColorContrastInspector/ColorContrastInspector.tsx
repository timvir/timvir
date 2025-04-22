import chroma from "chroma-js";
import { css, cx } from "@linaria/core";
import * as React from "react";
import { Cell } from "./internal";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  background: string[];
  foreground: string[];

  whitelist?: Array<[string, string]>;
}

const classes = {
  cell: css`
    opacity: 0;
    transition: all 0.2s;

    &:hover {
      opacity: 1 !important;
    }
  `,
  whitelisted: css`
    opacity: 1;
  `,
};

function ColorContrastInspector(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const { background, foreground, whitelist, className, ...rest } = props;

  return (
    <Root
      ref={ref}
      {...rest}
      className={cx(
        className,
        css`
          display: grid;
          grid-gap: 2px;
          align-items: center;

          font-weight: 500;

          &:hover ${classes.cell}:not(${classes.whitelisted}) {
            opacity: 0.2;
          }
        `
      )}
      style={{
        gridTemplateColumns: `min-content repeat(${background.length}, 1fr)`,
      }}
    >
      <div style={{ height: 80 }} />

      {background.map((value, i) => {
        const color = chroma.contrast(value, "white") > chroma.contrast(value, "black") ? "white" : "black";
        return (
          <React.Fragment key={i}>
            <div
              className={css`
                align-self: stretch;

                &:first-child {
                  border-radius: 3px 0 0 0;
                }
                &:last-child {
                  border-radius: 0 3px 0 0;
                }
              `}
              style={{ background: value, gridRow: "1 / 9", gridColumn: `${i + 2} / span 1` }}
            />
            <div
              className={css`
                justify-self: center;
              `}
              style={{ color, gridRow: "1 / span 1", gridColumn: `${i + 2} / span 1` }}
            >
              {value}
            </div>
          </React.Fragment>
        );
      })}

      {foreground.map((text, i) => {
        const color = chroma.contrast(text, "white") > chroma.contrast(text, "black") ? "white" : "black";
        return (
          <React.Fragment key={i}>
            <div
              className={css`
                grid-column: 1 / span 1;
                height: 32px;
              `}
              style={{ background: text, gridRow: `${i + 2} / span 1` }}
            />

            <div
              className={css`
                grid-column: 1 / span 1;
                padding: 0 12px;
                border-right: 2px solid white;
                height: 32px;
                display: flex;
                align-items: center;
                margin-right: -2px;
              `}
              style={{ gridRow: `${i + 2} / span 1`, color }}
            >
              {text}
            </div>

            {background.map((value, j) => {
              const isWhitelisted =
                whitelist === undefined || !!whitelist.find(([bg, fg]) => bg === value && fg === text);
              return (
                <Cell
                  key={j}
                  background={value}
                  foreground={text}
                  isWhitelisted={isWhitelisted}
                  style={{ gridRow: `${i + 2} / span 1`, gridColumn: `${j + 2} / span 1` }}
                  className={cx(classes.cell, isWhitelisted && classes.whitelisted)}
                />
              );
            })}
          </React.Fragment>
        );
      })}
    </Root>
  );
}

export default React.forwardRef(ColorContrastInspector);
