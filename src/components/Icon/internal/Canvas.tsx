import { css } from "linaria";
import { styled } from "linaria/react";
import React from "react";

const Component = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  transition: box-shadow 0.2s;
  cursor: pointer;

  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
    z-index: 5;
  }

  &:hover svg:first-of-type rect {
    opacity: 1;
  }
`;

interface Props {
  width: number;
  height: number;

  size: number;
  Component: React.ReactType;
}

function Canvas({ width, height, size, ...props }: Props) {
  return (
    <Component style={{ width, height }}>
      <Grid size={size} />
      <div
        style={{
          position: "relative",
          zIndex: 20,
          fontSize: `${size}px`
        }}
      >
        <props.Component />
      </div>
    </Component>
  );
}

export default Canvas;

class Grid extends React.PureComponent<{ size: number }> {
  render() {
    const { size } = this.props;

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
      <svg
        style={{ display: "block", position: "absolute", zIndex: 5, overflow: "visible" }}
        width="120"
        height="120"
        viewBox="0 0 120 120"
      >
        <rect
          className={css`
            opacity: 0;
            transition: opacity 0.2s;
          `}
          x={center - halfSize}
          y={center - halfSize}
          width={size}
          height={size}
          fill="#FFBBFF"
        />

        <Corner dx={sub} dy={sub} />
        <Corner dx={add} dy={sub} />
        <Corner dx={add} dy={add} />
        <Corner dx={sub} dy={add} />
      </svg>
    );
  }
}
