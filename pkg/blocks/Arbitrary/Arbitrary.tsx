import { css, cx } from "@linaria/core";
import { Exhibit } from "@timvir/blocks";
import { useBlock } from "@timvir/core";
import * as base58 from "@timvir/std/base58";
import * as React from "react";
import { useImmer } from "use-immer";
import { Context } from "./context";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithRef<typeof Root> {
  ExhibitProps?: React.ComponentPropsWithRef<typeof Exhibit>;
}

function Arbitrary(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const block = useBlock(props);

  const { ExhibitProps, className, children, ...rest } = block.props;

  const [value, mutate] = useImmer({
    seed: 0,
  });

  React.useEffect(() => {
    mutate((draft) => {
      draft.seed = crypto.getRandomValues(new Uint32Array(1))[0];
    });
  }, [mutate]);

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
      <Root ref={ref} className={cx(classes.root, className)} {...rest}>
        <div className={classes.controls}>
          <div className={classes.textField}>
            <span className={classes.startAdornment}>Seed:</span>
            <input
              className={classes.input}
              placeholder="Seed"
              value={base58.encode(new TextEncoder().encode(`${value.seed}`))}
              onPaste={(ev) => {
                const v = ev.clipboardData.getData("text/plain");
                mutate((draft) => {
                  draft.seed = +base58.decode(v);
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
              mutate((draft) => {
                draft.seed = crypto.getRandomValues(new Uint32Array(1))[0];
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
    height: 36px;
    position: relative;

    &::after {
      display: block;
      position: absolute;
      content: "";
      inset: 0;
      pointer-events: none;
      border: 1px solid var(--timvir-secondary-text-color);
      border-radius: 2px;
    }

    &:hover::after {
      border-color: var(--timvir-accent-color);
    }

    &:focus-within::after {
      border-color: var(--timvir-accent-color);
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
    height: 34px;
    width: 100%;
    color: inherit;
  `,

  button: css`
    border: none;
    outline: none;
    height: 36px;
    background: var(--timvir-accent-color);
    font: inherit;
    border-radius: 2px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: var(--c-p-3);
    }
    &:active {
      background: var(--c-p-4);
    }
  `,
};
