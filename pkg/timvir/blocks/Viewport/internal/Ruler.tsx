import * as stylex from "@stylexjs/stylex";

interface Props {
  containerWidth?: number;
  viewportWidth?: number;
}

const height = 16;

function Ruler(props: Props) {
  const { containerWidth = 0, viewportWidth = 0 } = props;

  return (
    <svg viewBox={`-${containerWidth / 2} ${-height / 2} ${containerWidth} ${height}`} {...stylex.props(styles.svg)}>
      <rect
        x={-containerWidth / 2}
        y={-height / 2}
        width={containerWidth}
        height={height}
        fill="var(--timvir-secondary-background-color)"
      />

      <line
        x1={-viewportWidth / 2}
        x2={-viewportWidth / 2}
        y1={-height / 2}
        y2={height / 2}
        strokeWidth={2}
        stroke="var(--timvir-text-color)"
      />
      <line
        x1={viewportWidth / 2}
        x2={viewportWidth / 2}
        y1={-height / 2}
        y2={height / 2}
        strokeWidth={2}
        stroke="var(--timvir-text-color)"
      />
    </svg>
  );
}

export default Ruler;

const styles = stylex.create({
  svg: {
    width: "100%",
    display: "block",
    height: `${height}px`,
    margin: "8px 0",
  },
});
