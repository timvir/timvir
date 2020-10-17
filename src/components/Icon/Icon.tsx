import { css } from "linaria";
import React from "react";
import Measure, { MeasuredComponentProps } from "react-measure";
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
    top: -6px;
    color: var(--c-text-light);
  `,
};

function Icon({ descriptor, ...props }: Props, ref: any /* FIXME */) {
  return (
    <Root ref={ref} {...props}>
      <Measure bounds>
        {({ measureRef, contentRect }: MeasuredComponentProps) => (
          <div
            className={css`
              position: relative;
              z-index: 2;
              svg {
                display: block;
              }

              &:hover {
                z-index: 10;
              }

              &:hover .${classes.name} {
                opacity: 1;
                top: 0px;
                color: var(--c-text);
              }
            `}
            ref={measureRef}
          >
            {contentRect.bounds && (
              <div style={{ width: contentRect.bounds.width, height: contentRect.bounds.width }}>
                <Canvas
                  width={contentRect.bounds.width}
                  height={contentRect.bounds.width}
                  size={32 /*descriptor.instances[0].size as number */}
                  Component={descriptor.instances[0].Component}
                />
              </div>
            )}

            <div className={classes.name}>{descriptor.name}</div>
          </div>
        )}
      </Measure>
    </Root>
  );
}

export default React.forwardRef(Icon);
