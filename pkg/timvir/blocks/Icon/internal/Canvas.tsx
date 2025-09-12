import * as stylex from "@stylexjs/stylex";
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
    <Root {...stylex.props(styles.root)} style={{ width, height }}>
      <div {...stylex.props(styles.backdrop)} />
      <Grid {...stylex.props(styles.grid)} size={size} />
      <div style={{ gridColumn: 1, gridRow: 1, fontSize: `${size}px`, zIndex: 1 }}>
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

const styles = stylex.create({
  root: {
    display: "grid",
    placeItems: "center",
    cursor: "pointer",

    "--timvir-b-Icon-hover": 0,
    ":hover": {
      "--timvir-b-Icon-hover": 1,
    },
  },
  backdrop: {
    gridColumn: 1,
    gridRow: 1,
    backgroundColor: "white",
    placeSelf: "stretch",
    borderRadius: 2,
    transition: "all 0.16s",
    boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.1)",
  },
  grid: {
    gridColumn: 1,
    gridRow: 1,
    display: "block",
    opacity: "var(--timvir-b-Icon-hover)",
    transition: "all 0.16s",
    pointerEvents: "none",
  },
});
