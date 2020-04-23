import chroma from "chroma-js";
import { css } from "linaria";
import React from "react";
import { Cell } from "./internal";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  background: string[];
  foreground: string[];
}

function ColorContrastInspector({ background, foreground, ...props }: Props, ref: any /* FIXME */) {
  return (
    <Root
      ref={ref}
      {...props}
      className={css`
        display: grid;
        grid-gap: 2px;
        align-items: center;
      `}
      style={{
        gridTemplateColumns: `80px repeat(${background.length}, 1fr)`,
      }}
    >
      <div style={{ height: 80 }} />

      {background.map((value, i) => {
        const color = chroma.contrast(value, "white") > chroma.contrast(value, "black") ? "white" : "black";
        return (
          <>
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
          </>
        );
      })}

      {foreground.map((text, i) => {
        const color = chroma.contrast(text, "white") > chroma.contrast(text, "black") ? "white" : "black";
        return (
          <React.Fragment>
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
                padding-left: 12px;
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
              return (
                <Cell
                  key={j}
                  background={value}
                  foreground={text}
                  style={{ gridRow: `${i + 2} / span 1`, gridColumn: `${j + 2} / span 1` }}
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
