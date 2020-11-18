import { css, cx } from "linaria";
import React from "react";
import { useResizeObserverEntry } from "../../hooks/useResizeObserver";
import { Canvas } from "./internal";
import { Descriptor, Size } from "./types";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentProps<typeof Root> {
  allSizes: Size[];
  descriptor: Descriptor;
}

const classes = {
  name: css`
    margin-top: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.75rem;
    opacity: 0;
    transition: all 0.16s;
    z-index: 1;
    position: relative;
    top: -10px;
    color: var(--c-text-light);
    text-align: center;
    user-select: none;
    pointer-events: none;
  `,
};

function Icon(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { allSizes: _, descriptor, className, ...rest } = props;

  const [roRef, roe] = useResizeObserverEntry();
  const width = roe?.contentRect.width;

  return (
    <Root
      ref={ref}
      className={cx(
        className,
        css`
          position: relative;
          z-index: 2;

          svg {
            display: block;
          }

          &:hover ${classes.name} {
            opacity: 1;
            top: 0px;
            color: var(--c-text);
          }
          &:active ${classes.name} {
            top: -2px;
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
