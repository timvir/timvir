import * as stylex from "@stylexjs/stylex";
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
  }, [open, onDispose]);

  React.useEffect(() => {
    (async () => {
      const { edges } = await defaultSearch(toc).q(state.query);
      setState((state) => ({
        ...state,
        commands: edges,
      }));
    })();
  }, [toc, state.query]);

  return (
    <div {...stylex.props(styles.root)} style={state.style} {...rest}>
      <div {...stylex.props(styles.context)}>Context</div>

      <div {...stylex.props(styles.prompt)}>
        <input
          {...stylex.props(styles.input)}
          autoFocus
          placeholder="Type a command or search…"
          value={state.query}
          onChange={(ev) => {
            const query = ev.currentTarget.value;
            setState((state) => ({
              ...state,
              query,
            }));
          }}
        />
      </div>

      <div>
        <div {...stylex.props(styles.subheader)}>Pages</div>

        <div {...stylex.props(styles.commands)}>
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

const styles = stylex.create({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flexShrink: 1,
    flexGrow: 1,
    minWidth: "min-content",
    willChange: "transform",
    transformOrigin: "center center",
    backgroundColor: "rgb(39, 40, 43)",
    borderRadius: 8,
    boxShadow: "rgb(0 0 0 / 20%) 0px 4px 12px",
    maxWidth: 640,
    color: "rgb(214, 214, 214)",
    overflow: "hidden",
    transition: "opacity 0.2s, transform 0.2s",
  },

  context: {
    margin: "16px 16px 0px",
    height: 25,
    lineHeight: "25px",
    padding: "0px 8px",
    fontSize: "0.8em",
    flexShrink: 0,
    alignSelf: "flex-start",
    color: "rgb(138, 143, 152)",
    backgroundColor: "rgb(49, 50, 54)",
    borderRadius: 4,
    maxWidth: "calc(100vw - 60px)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  prompt: {
    borderBottom: "1px solid rgb(49, 50, 54)",
    display: "grid",
    gridTemplateColumns: "1fr",
    alignItems: "center",
    position: "relative",
    flexShrink: 0,
    height: 62,
  },

  input: {
    padding: 20,
    gridArea: "1 / 1 / auto / auto",
    margin: 0,
    borderWidth: 0,
    appearance: "none",
    fontSize: "inherit",
    height: 62,
    backgroundColor: "transparent",
    color: "rgb(214, 214, 214)",
    caretColor: "rgb(110, 94, 210)",
    outline: "none",
    width: "100%",
  },

  subheader: {
    backgroundColor: "rgba(247, 247, 248, 0.03)",
    height: 24,
    paddingInline: 14,
    fontSize: "0.75rem",
    color: "rgb(129, 128, 142)",
  },

  commands: {
    height: 300,
    overflow: "auto",
  },
});
