"use client";

import { cx } from "@linaria/core";
import * as stylex from "@stylexjs/stylex";
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

  const { values, ...rest } = block.props;

  const [selected, setSelected] = React.useState<undefined | Props["values"][number]>(undefined);

  const rootStyleProps = stylex.props(styles.root);

  return (
    <Root
      ref={ref}
      {...rest}
      {...rootStyleProps}
      className={cx(rest.className, rootStyleProps.className)}
      style={{ ...rootStyleProps.style, ...rest.style }}
    >
      <div {...stylex.props(styles.bar)} style={{ opacity: selected ? 0 : 1 }}>
        {values.map((value, i, self) => (
          <div key={i} {...stylex.props(styles.value)}>
            <div
              {...stylex.props(i === 0 && styles.firstChild, i === self.length - 1 && styles.lastChild)}
              style={{ background: typeof value === "string" ? value : value.value }}
              onClick={() => {
                setSelected(value);
              }}
            />
          </div>
        ))}
      </div>

      {selected !== undefined && (
        <div {...stylex.props(styles.overlay)}>
          <Swatch
            {...(typeof selected === "string" ? { value: selected } : { value: selected.value })}
            onMouseLeave={() => {
              setSelected(undefined);
            }}
          />
        </div>
      )}
    </Root>
  );
}

export default React.forwardRef(ColorBar);

const styles = stylex.create({
  root: {
    position: "relative",
  },

  bar: {
    display: "grid",
    gridAutoFlow: "row",
    gridTemplateColumns: "repeat(auto-fit, minmax(0, 1fr))",
  },

  value: {
    height: 40,
    flexGrow: 1,

    display: "grid",
    placeItems: "stretch",

    cursor: "pointer",
  },

  firstChild: {
    borderRadius: "2px 0 0 2px",
  },
  lastChild: {
    borderRadius: "0 2px 2px 0",
  },

  overlay: {
    position: "absolute",
    top: "50%",
    right: 0,
    left: 0,
    transform: "translateY(-50%)",
    zIndex: 4,
  },
});
