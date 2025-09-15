"use client";

import { cx } from "@linaria/core";
import * as stylex from "@stylexjs/stylex";
import * as base58 from "bytestring/base58";
import * as React from "react";
import { Exhibit } from "timvir/blocks";
import { layoutStyles, useBlock } from "timvir/core";
import { Context } from "./context";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithRef<typeof Root> {
  ExhibitProps?: React.ComponentPropsWithRef<typeof Exhibit>;
}

function Arbitrary(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const block = useBlock(props);

  const { ExhibitProps, className, children, ...rest } = block.props;

  const [value, setValue] = React.useState({ seed: 0 });

  React.useEffect(() => {
    setValue({
      seed: crypto.getRandomValues(new Uint32Array(1))[0],
    });
  }, []);

  React.useEffect(() => {
    if (props.id) {
      block.bus.next({
        type: "SIGNAL",
        path: `/dev/timvir/block/${props.id}`,
        interface: "dev.timvir.block.Arbitrary",
        member: "seed",
        body: value.seed,
      });
    }
  }, [props.id, block.bus, value.seed]);

  const rootStyleProps = stylex.props(layoutStyles.block, styles.root);
  const inputStyleProps = stylex.props(styles.input);

  return (
    <Context.Provider value={value}>
      <Root
        ref={ref}
        {...rest}
        {...rootStyleProps}
        className={cx("timvir-b-Arbitrary", rootStyleProps.className, className)}
        style={{ margin: "1em 0", ...rootStyleProps.style, ...rest.style }}
      >
        <div {...stylex.props(styles.controls)}>
          <div {...stylex.props(styles.textField)}>
            <span {...stylex.props(styles.startAdornment)}>Seed:</span>
            <input
              {...inputStyleProps}
              className={cx("timvir-b-Arbitrary-seed", inputStyleProps.className)}
              style={{ ...inputStyleProps.style }}
              placeholder="Seed"
              value={base58.encode(new TextEncoder().encode(`${value.seed}`))}
              readOnly
              onPaste={(ev) => {
                const v = ev.clipboardData.getData("text/plain");
                setValue({
                  seed: +new TextDecoder().decode(base58.decode(v)),
                });
              }}
              onFocus={(ev) => {
                ev.currentTarget.select();
              }}
            />
          </div>

          <button
            type="button"
            {...stylex.props(styles.button)}
            onClick={() => {
              setValue({
                seed: crypto.getRandomValues(new Uint32Array(1))[0],
              });
            }}
          >
            Refresh
          </button>
        </div>

        <Exhibit {...ExhibitProps} style={{ margin: 0 }}>
          {children}
        </Exhibit>
      </Root>
    </Context.Provider>
  );
}

export default React.forwardRef(Arbitrary);

const styles = stylex.create({
  root: {
    margin: "1em 0",
  },

  controls: {
    display: "grid",
    gridGap: "8px",
    gridTemplateColumns: "1fr 100px",
    marginBottom: "8px",
  },

  textField: {
    display: "flex",
    alignItems: "center",
    padding: "0 0 0 10px",
    minHeight: "36px",
    position: "relative",
    backgroundColor: "var(--timvir-secondary-background-color)",
    wordBreak: "initial",

    ":after": {
      display: "block",
      position: "absolute",
      content: "",
      inset: 0,
      pointerEvents: "none",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "var(--timvir-border-color)",
      borderRadius: "2px",
    },

    ":hover:after": {
      borderColor: "var(--timvir-text-color)",
    },

    ":focus-within:after": {
      borderColor: "var(--timvir-text-color)",
    },
  },

  startAdornment: {
    display: "inline-block",
    color: "var(--timvir-secondary-text-color)",
    marginRight: "6px",
  },

  input: {
    borderWidth: 0,
    outline: "none",
    font: "inherit",
    backgroundColor: "transparent",
    alignSelf: "stretch",
    padding: 0,
    width: "100%",
    color: "inherit",
  },

  button: {
    outline: "none",
    minHeight: "36px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--timvir-border-color)",
    borderRadius: "2px",
    backgroundColor: "var(--timvir-secondary-background-color)",
    color: "var(--timvir-text-color)",
    font: "inherit",

    ":hover": {
      borderColor: "var(--timvir-text-color)",
      backgroundColor: "var(--timvir-sidebar-highlight-color)",
    },
    ":active": {
      borderColor: "var(--timvir-text-color)",
      backgroundColor: "var(--timvir-sidebar-highlight-color)",
    },
  },
});
