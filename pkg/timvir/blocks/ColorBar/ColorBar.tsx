"use client";

import { cx } from "../../internal/cx";
import * as stylex from "@stylexjs/stylex";
import { Swatch } from "timvir/blocks";
import { useBlock } from "timvir/core";
import { layoutStyles } from "../../core/layout";
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

  const rootStyleProps = stylex.props(layoutStyles.block, styles.root);

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
              {...stylex.props(
                i === 0 ? styles.firstChild : null,
                i === self.length - 1 ? styles.lastChild : null,
                styles.valueInner
              )}
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
            style={{ margin: 0 }}
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
    zIndex: 3,

    "--timvir-b-ColorBar-value-margin": "0px",

    ":hover": {
      "--timvir-b-ColorBar-value-borderRadius": "2px",
      "--timvir-b-ColorBar-value-margin": "-3px 1px",
    },
  },

  valueInner: {
    transition: "all 0.16s",

    borderRadius: "var(--timvir-b-ColorBar-value-borderRadius, var(--timvir-b-ColorBar-value-borderRadiusDefault))",
    margin: "var(--timvir-b-ColorBar-value-margin)",

    ":hover": {
      boxShadow:
        "inset 0 0 0 1px rgba(16, 22, 26, 0.2), 0 2px 4px rgba(16, 22, 26, 0.1), 0 8px 24px rgba(16, 22, 26, 0.2)",
    },
  },
  firstChild: {
    "--timvir-b-ColorBar-value-borderRadiusDefault": "2px 0 0 2px",
  },
  lastChild: {
    "--timvir-b-ColorBar-value-borderRadiusDefault": "0 2px 2px 0",
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
