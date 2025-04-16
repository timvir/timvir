import { css } from "@linaria/core";
import * as React from "react";
import { useContext } from "timvir/context";
import { defaultSearch } from "timvir/search";
import Action from "./Action";

interface Props {
  open?: boolean;
  onClose?: () => void;
  onDispose?: () => void;
}

function Dialog(props: Props) {
  const { toc } = useContext();

  const { open, onClose, onDispose, ...rest } = props;

  const [state, setState] = React.useState({
    style: { opacity: 0, transform: "scale(0.98)" } as React.CSSProperties,
    query: "",

    commands: [] as Array<{ node: { path: string; label: string } }>,
  });

  React.useEffect(() => {
    if (open) {
      setState((state) => ({
        ...state,
        style: { opacity: 1, transform: "none" },
      }));
    } else {
      setState((state) => ({
        ...state,
        style: { opacity: 0, transform: "scale(0.95)" },
      }));

      setTimeout(() => {
        onDispose?.();
      }, 200);
    }
  }, [open]);

  React.useEffect(() => {
    (async () => {
      const { edges } = await defaultSearch(toc).q(state.query);
      setState((state) => ({
        ...state,
        commands: edges,
      }));
    })();
  }, [state.query]);

  return (
    <div className={classes.root} style={state.style} {...rest}>
      <div className={classes.context}>Context</div>

      <div className={classes.prompt}>
        <input
          autoFocus
          placeholder="Type a command or search…"
          value={state.query}
          onChange={(ev) => {
            setState((state) => ({
              ...state,
              query: ev.currentTarget.value,
            }));
          }}
        />
      </div>

      <div>
        <div className={classes.subheader}>Pages</div>

        <div className={classes.commands}>
          {state.commands.map(({ node }, index) => (
            <Action
              key={index}
              label={node.label}
              onClick={() => {
                onClose?.();
                window.location.href = node.path;
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dialog;

const classes = {
  root: css`
    position: relative;

    display: flex;
    flex-direction: column;
    flex-shrink: 1;
    flex-grow: 1;

    min-width: min-content;

    will-change: transform;
    transform-origin: center center;

    background: linear-gradient(136.61deg, rgb(39, 40, 43) 13.72%, rgb(45, 46, 49) 74.3%);
    border-radius: 8px;
    box-shadow: rgb(0 0 0 / 50%) 0px 16px 70px;
    max-width: 640px;
    color: rgb(214, 214, 214);
    overflow: hidden;

    transition: opacity 0.2s, transform 0.2s;
  `,

  context: css`
    margin: 16px 16px 0px;
    height: 25px;
    line-height: 25px;
    padding: 0px 8px;
    font-size: 0.8em;
    flex-shrink: 0;
    align-self: flex-start;
    color: rgb(138, 143, 152);
    background: rgb(49, 50, 54);
    border-radius: 4px;
    max-width: calc(100vw - 60px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  prompt: css`
    border-bottom: 1px solid rgb(49, 50, 54);
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    position: relative;
    flex-shrink: 0;
    height: 62px;

    & > input {
      padding: 20px;
      grid-area: 1 / 1 / auto / auto;
      margin: 0px;
      border: none;
      appearance: none;
      font-size: inherit;
      height: 62px;
      background: transparent;
      color: rgb(214, 214, 214);
      caret-color: rgb(110, 94, 210);
      outline: none;
      width: 100%;
    }
  `,

  subheader: css`
    background: rgba(247, 247, 248, 0.03);
    height: 24px;

    padding-inline: 14px;

    font-size: 0.75rem;
    color: rgb(129, 128, 142);
  `,

  commands: css`
    height: 300px;
    overflow: auto;
  `,
};
