import { css, cx } from "@linaria/core";
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
  const { descriptor, className, ...rest } = props;

  const [roRef, roe] = useResizeObserverEntry();
  const width = roe?.contentRect.width;

  return (
    <Root
      ref={ref}
      className={cx(
        className,
        css`
          position: relative;
          z-index: 1;

          --timvir-b-Icon-hover: 0;
          &:hover {
            --timvir-b-Icon-hover: 1;
          }
        `
      )}
      {...rest}
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
            <div className={classes.name}>{descriptor.name}</div>
          </>
        )}
      </div>
    </Root>
  );
}

export default React.forwardRef(Icon);

const classes = {
  name: css`
    margin-top: 0;
    white-space: nowrap;
    font-size: 0.75rem;
    opacity: var(--timvir-b-Icon-hover);
    transition: all 0.16s;
    z-index: -1;
    color: var(--timvir-text-color);
    text-align: center;
    user-select: none;
    pointer-events: none;
    position: absolute;
    left: 50%;
    bottom: -14px;
    transform: translate(-50%, calc(var(--timvir-b-Icon-hover) * 6px));
  `,
};
