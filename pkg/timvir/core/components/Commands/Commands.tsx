import { css } from "@linaria/core";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { useHotkeys } from "react-hotkeys-hook";
import { Dialog } from "./internal";

interface Props {}

function Commands(props: Props) {
  const {} = props;

  const [state, setState] = React.useState({
    /**
     * Whether the command palette should be open or not. The command palette is
     * opened by cmd+k, and closed by escape or clicking outside of the dialog.
     */
    open: false,

    /**
     * If the dialog is visible (even during the closing transition), this
     * object contains both the container element (a div appended to the end of
     * the body) and the React Portal (that is returned by this component).
     */
    dialog: null as null | {
      containerElement: HTMLDivElement;
      reactPortal: React.ReactPortal;
    },
  });

  function open() {
    setState({
      open: true,
      dialog: (() => {
        if (!state.dialog) {
          const containerElement = document.createElement("div");
          document.body.appendChild(containerElement);

          const reactPortal = ReactDOM.createPortal(
            <div
              className={classes.root}
              onClick={(ev) => {
                if (ev.target === ev.currentTarget) {
                  close();
                }
              }}
            >
              <Dialog open onClose={close} />
            </div>,
            containerElement
          );

          return { containerElement, reactPortal };
        } else {
          return {
            containerElement: state.dialog.containerElement,
            reactPortal: ReactDOM.createPortal(
              <div
                className={classes.root}
                onClick={(ev) => {
                  if (ev.target === ev.currentTarget) {
                    close();
                  }
                }}
              >
                <Dialog open onClose={close} />
              </div>,
              state.dialog.containerElement
            ),
          };
        }
      })(),
    });
  }

  function close() {
    setState({
      open: false,
      dialog: (() => {
        if (state.dialog) {
          return {
            containerElement: state.dialog.containerElement,
            reactPortal: ReactDOM.createPortal(
              <div className={classes.root}>
                <Dialog
                  onDispose={() => {
                    setState({
                      open: state.open,
                      dialog: (() => {
                        if (!state.open && state.dialog) {
                          document.body.removeChild(state.dialog.containerElement);
                          return null;
                        } else {
                          return state.dialog;
                        }
                      })(),
                    });
                  }}
                />
              </div>,
              state.dialog.containerElement
            ),
          };
        } else {
          return state.dialog;
        }
      })(),
    });
  }

  useHotkeys(
    "meta+k",
    (ev) => {
      ev.preventDefault();

      if (!state.open) {
        open();
      } else {
        close();
      }
    },
    { enableOnFormTags: ["INPUT"] }
  );

  useHotkeys(
    "escape",
    () => {
      close();
    },
    { enableOnFormTags: ["INPUT"] }
  );

  /*
   * Crude body scroll lock when the dialog is open.
   */
  React.useEffect(() => {
    if (state.open) {
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [state.open]);

  return state.dialog?.reactPortal ?? null;
}

export default Commands;

const classes = {
  root: css`
    position: fixed;
    inset: 0px;
    display: flex;
    z-index: 900;
    align-items: flex-start;
    justify-content: center;
    padding: 13vh 16px 16px;

    font-family: system-ui, sans-serif;
    font-feature-settings: "liga", "kern";
    text-rendering: optimizelegibility;

    font-size: 16px;
    line-height: 1.725;
  `,
};
