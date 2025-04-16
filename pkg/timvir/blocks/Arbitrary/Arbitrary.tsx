"use client";

import { css, cx } from "@linaria/core";
import { Exhibit } from "timvir/blocks";
import { useBlock } from "timvir/core";
import * as base58 from "bytestring/base58";
import * as React from "react";
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
  }, [block.bus, value.seed]);

  return (
    <Context.Provider value={value}>
      <Root ref={ref} className={cx("timvir-b-Arbitrary", classes.root, className)} {...rest}>
        <div className={classes.controls}>
          <div className={classes.textField}>
            <span className={classes.startAdornment}>Seed:</span>
            <input
              className={cx("timvir-b-Arbitrary-seed", classes.input)}
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
            className={classes.button}
            onClick={() => {
              setValue({
                seed: crypto.getRandomValues(new Uint32Array(1))[0],
              });
            }}
          >
            Refresh
          </button>
        </div>

        <Exhibit {...ExhibitProps}>{children}</Exhibit>
      </Root>
    </Context.Provider>
  );
}

export default React.forwardRef(Arbitrary);

const classes = {
  root: css`
    margin: 1em 0;
  `,

  controls: css`
    display: grid;
    grid-gap: 8px;
    grid-template-columns: 1fr 100px;
    margin-bottom: 8px;
  `,

  textField: css`
    display: flex;
    align-items: center;
    padding: 0 0 0 10px;
    min-height: 36px;
    position: relative;
    background: var(--timvir-secondary-background-color);

    &::after {
      display: block;
      position: absolute;
      content: "";
      inset: 0;
      pointer-events: none;
      border: 1px solid var(--timvir-border-color);
      border-radius: 2px;
    }

    &:hover::after {
      border-color: var(--timvir-text-color);
    }

    &:focus-within::after {
      border-color: var(--timvir-text-color);
    }
  `,

  startAdornment: css`
    display: inline-block;
    color: var(--timvir-secondary-text-color);
    margin-right: 6px;
  `,

  input: css`
    border: none;
    outline: none;
    font: inherit;
    background: transparent;
    align-self: stretch;
    padding: 0;
    width: 100%;
    color: inherit;
  `,

  button: css`
    border: none;
    outline: none;
    min-height: 36px;
    border: 1px solid var(--timvir-border-color);
    border-radius: 2px;
    background: var(--timvir-secondary-background-color);
    color: var(--timvir-text-color);
    font: inherit;

    &:hover {
      border-color: var(--timvir-text-color);
      background: var(--timvir-sidebar-highlight-color);
    }
    &:active {
      border-color: var(--timvir-text-color);
      background: var(--timvir-sidebar-highlight-color);
    }
  `,
};
