import * as stylex from "@stylexjs/stylex";
import * as React from "react";

interface Props {
  gridColumn: string;
  lock: React.MutableRefObject<string>;
  edge: "left" | "right";
  iframeRef: React.RefObject<null | HTMLIFrameElement>;
}

function Handle(props: Props) {
  const { gridColumn, lock, edge, iframeRef } = props;

  return (
    <div
      {...stylex.props(styles.handle)}
      onMouseDown={() => {
        lock.current = edge;
        if (iframeRef.current) {
          iframeRef.current.style.userSelect = "none";
          iframeRef.current.style.pointerEvents = "none";
        }
      }}
      style={{ gridColumn }}
    >
      <svg width="56" height="56" viewBox="0 0 56 56">
        <path fill="currentColor" d="M27 18h2v20h-2V18zm-6 0h2v20h-2V18zm12 0h2v20h-2V18z" />
      </svg>
    </div>
  );
}

export default React.memo(Handle);

const styles = stylex.create({
  handle: {
    gridRow: "1 / span 3",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.5,
    color: "var(--timvir-text-color)",
    borderRadius: "2px",
    transition: "all 0.2s cubic-bezier(0.4, 1, 0.75, 0.9)",
    ":hover": {
      opacity: 1,
      boxShadow: "0 0 0 1px rgba(16, 22, 26, 0.1), 0 2px 4px rgba(16, 22, 26, 0.2), 0 8px 24px rgba(16, 22, 26, 0.2)",
    },
    ":active": {
      boxShadow: "0 0 0 1px rgba(16, 22, 26, 0.1), 0 0 0 rgba(16, 22, 26, 0), 0 1px 1px rgba(16, 22, 26, 0.2)",
    },
  },
});
