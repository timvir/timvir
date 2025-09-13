"use client";

import { css, cx } from "@linaria/core";
import { Swatch } from "timvir/blocks";
import { useBlock } from "timvir/core";
import * as React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  /**
   * Array of CSS Color values.
   */
  values: Array<string | { value: string; contrastValue?: string; name?: string; ancestry?: string }>;
}

function ColorBar(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const block = useBlock(props);

  const { values, className, ...rest } = block.props;

  const [selected, setSelected] = React.useState<undefined | Props["values"][number]>(undefined);

  return (
    <Root ref={ref} className={cx(className, classes.root, selected && tweaks.selected)} {...rest}>
      <div className={classes.bar} style={{ opacity: selected ? 0 : 1 }}>
        {values.map((value, i, self) => (
          <div key={i} className={classes.value}>
            <div
              className={cx(i === 0 && classes.firstChild, i === self.length - 1 && classes.lastChild)}
              style={{ background: typeof value === "string" ? value : value.value }}
              onClick={() => {
                setSelected(value);
              }}
            />
          </div>
        ))}
      </div>

      <div className={classes.overlay}>
        <Swatch
          {...(typeof selected === "string" ? { value: selected } : { value: selected?.value ?? "" })}
          onMouseLeave={() => {
            setSelected(undefined);
          }}
        />
      </div>
    </Root>
  );
}

export default React.forwardRef(ColorBar);

const tweaks = {
  selected: css``,
};

const classes = {
  root: css`
    position: relative;
  `,

  bar: css`
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    transition: all 0.16s;
  `,

  value: css`
    height: 40px;
    flex-grow: 1;

    display: grid;
    place-items: stretch;

    cursor: pointer;
  `,

  firstChild: css`
    border-radius: 2px 0 0 2px;
  `,
  lastChild: css`
    border-radius: 0 2px 2px 0;
  `,

  overlay: css`
    position: absolute;
    top: 50%;
    right: 0px;
    left: 0px;
    transform: translateY(-50%);
    pointer-events: none;
    opacity: 0;
    z-index: 4;
    transition: opacity 0.16s;

    .${tweaks.selected} & {
      pointer-events: all;
      opacity: 1;
    }
  `,
};
