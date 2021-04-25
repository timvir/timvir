import { css } from "@linaria/core";
import { Exhibit } from "@timvir/blocks";
import * as React from "react";
import { useImmer } from "use-immer";
import * as base58 from "@timvir/std/base58";
import { Context } from "./context";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithRef<typeof Root> {
  ExhibitProps?: React.ComponentPropsWithRef<typeof Exhibit>;
}

function Arbitrary(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { ExhibitProps, children, ...rest } = props;

  const [value, mutate] = useImmer({
    seed: 0,
  });

  React.useEffect(() => {
    mutate((draft) => {
      draft.seed = crypto.getRandomValues(new Uint32Array(1))[0];
    });
  }, [mutate]);

  return (
    <Context.Provider value={value}>
      <Root ref={ref} style={{ margin: "1em 0" }} {...rest}>
        <div
          className={css`
            display: grid;
            grid-gap: 12px;
            grid-template-columns: 1fr 100px;
            align-items: center;
            margin-bottom: 8px;
          `}
        >
          <div
            className={css`
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
                border: 1px solid var(--c-p-2);
                border-radius: 2px;
              }

              &:hover::after {
                border-color: var(--c-p-4);
              }

              &:focus-within::after {
                border: 2px solid var(--c-p-4);
                border-radius: 3px;
              }
            `}
          >
            <span
              className={css`
                display: inline-block;
                color: grey;
                margin-right: 6px;
              `}
            >
              Seed:
            </span>

            <input
              className={css`
                border: none;
                outline: none;
                font: inherit;
                background: transparent;
                align-self: stretch;
                padding: 0;
                height: 34px;
                width: 100%;
              `}
              placeholder="Seed"
              value={base58.encode(`${value.seed}`)}
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
            className={css`
              border: none;
              outline: none;
              height: 36px;
              background: var(--c-p-2);
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
            `}
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
