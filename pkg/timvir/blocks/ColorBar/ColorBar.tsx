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
        {values.map((value, i) => (
          <div key={i} className={classes.value}>
            <div
              style={{ background: typeof value === "string" ? value : value.value }}
              onClick={() => {
                setSelected(value);
              }}
            />
          </div>
        ))}
        <div className={classes.barOverlay} />
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

    --timvir-b-ColorBar-bar-opacity: 1;
    &:hover {
      --timvir-b-ColorBar-bar-opacity: 0;
    }
  `,

  barOverlay: css`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    z-index: 2;
    border-radius: 2px;
    box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.15);
    pointer-events: none;
    user-select: none;
    transition: all 0.16s;
    opacity: var(--timvir-b-ColorBar-bar-opacity);
  `,

  value: css`
    height: 40px;
    flex-grow: 1;

    display: grid;
    place-items: stretch;

    & > div {
      transition: all 0.16s;
      cursor: pointer;
    }
    &:first-child > div {
      border-radius: 2px 0 0 2px;
    }
    &:last-child > div {
      border-radius: 0 2px 2px 0;
    }

    &:hover {
      z-index: 3;
    }
    &:hover > div {
      border-radius: 2px;
      margin: -3px 1px;
      box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2), 0 2px 4px rgba(16, 22, 26, 0.1),
        0 8px 24px rgba(16, 22, 26, 0.2);
    }
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
