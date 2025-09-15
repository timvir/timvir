"use client";

import { cx } from "../../internal/cx";
import * as stylex from "@stylexjs/stylex";
import { useResizeObserverEntry } from "timvir/hooks";
import * as React from "react";
import { Canvas } from "./internal";
import { Descriptor } from "./types";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentProps<typeof Root> {
  descriptor: Descriptor;
}

function Icon(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const { descriptor, ...rest } = props;

  const [roRef, roe] = useResizeObserverEntry();
  const width = roe?.contentRect.width;

  const rootStyleProps = stylex.props(styles.root);

  return (
    <Root
      ref={ref}
      {...rest}
      {...rootStyleProps}
      className={cx(rest.className, rootStyleProps.className)}
      style={{ ...rootStyleProps.style, ...rest.style }}
    >
      <div ref={roRef}>
        {width !== undefined && (
          <>
            <Canvas
              width={width}
              height={width}
              size={32 /*descriptor.instances[0].size as number */}
              Component={descriptor.instances[0].Component}
            />
            <div {...stylex.props(styles.name)}>{descriptor.name}</div>
          </>
        )}
      </div>
    </Root>
  );
}

export default React.forwardRef(Icon);

const styles = stylex.create({
  root: {
    position: "relative",
    zIndex: 1,

    "--timvir-b-Icon-hover": "0",
    ":hover": {
      "--timvir-b-Icon-hover": "1",
    },
  },
  name: {
    marginTop: 0,
    whiteSpace: "nowrap",
    fontSize: "0.75rem",
    opacity: "var(--timvir-b-Icon-hover)",
    transition: "all 0.16s",
    zIndex: -1,
    color: "var(--timvir-text-color)",
    textAlign: "center",
    userSelect: "none",
    pointerEvents: "none",
    position: "absolute",
    left: "50%",
    bottom: "-20px",
    transform: "translate(-50%, 0)",
  },
});
