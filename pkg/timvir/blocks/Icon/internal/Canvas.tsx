import { css } from "@linaria/core";
import * as React from "react";

const Root = "div";

interface Props {
  width: number;
  height: number;

  size: number;
  Component: React.ElementType;
}

function Canvas(props: Props) {
  const { width, height, size, Component } = props;

  return (
    <Root
      className={css`
        display: grid;
        place-items: center;

        cursor: pointer;

        & > * {
          grid-column: 1;
          grid-row: 1;
        }

        &:hover .${classes.backdrop} {
          box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2), 0 2px 4px rgba(16, 22, 26, 0.1),
            0 8px 24px rgba(16, 22, 26, 0.2);
        }

        &:active .${classes.backdrop} {
          margin: 1px;
          box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2), 0 1px 1px rgba(16, 22, 26, 0.2);
        }

        &:hover .${classes.grid} {
          opacity: 1;
        }
      `}
      style={{ width, height }}
    >
      <div className={classes.backdrop} />
      <Grid className={classes.grid} size={size} />
      <div style={{ fontSize: `${size}px`, zIndex: 1 }}>
        <Component />
      </div>
    </Root>
  );
}

export default Canvas;

function Grid({ size, ...rest }: { size: number } & React.ComponentProps<"svg">) {
  const halfSize = size / 2;
  const center = 60;
  const whiskerLength = Math.min(16, size / 2);

  const Corner = ({ dx, dy }: { dx: (a: number, b: number) => number; dy: (a: number, b: number) => number }) => (
    <g>
      <line
        x1={dx(center, halfSize)}
        x2={dx(center, halfSize + whiskerLength)}
        y1={dy(center, halfSize)}
        y2={dy(center, halfSize)}
        strokeWidth={1}
        stroke="#EEEEEE"
      />
      <line
        x1={dx(center, halfSize)}
        x2={dx(center, halfSize)}
        y1={dy(center, halfSize)}
        y2={dy(center, halfSize + whiskerLength)}
        strokeWidth={1}
        stroke="#EEEEEE"
      />
    </g>
  );

  const add = (a: number, b: number): number => a + b;
  const sub = (a: number, b: number): number => a - b;

  return (
    <svg width="120" height="120" viewBox="0 0 120 120" {...rest}>
      <rect x={center - halfSize} y={center - halfSize} width={size} height={size} fill="#FFBBFF88" />

      <Corner dx={sub} dy={sub} />
      <Corner dx={add} dy={sub} />
      <Corner dx={add} dy={add} />
      <Corner dx={sub} dy={add} />
    </svg>
  );
}

const classes = {
  backdrop: css`
    background: white;
    place-self: stretch;
    border-radius: 2px;
    transition: all 0.2s;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
  `,
  grid: css`
    display: block;
    opacity: 0;
    transition: all 0.2s;
    pointer-events: none;
  `,
};
