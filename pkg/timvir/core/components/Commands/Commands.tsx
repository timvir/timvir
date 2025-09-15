import { css } from "@linaria/core";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Dialog } from "./internal";

interface Props {
  open: boolean;
  onClose: () => void;
}

function Commands(props: Props) {
  const { open: _open, onClose: _onClose } = props;

  const [state, setState] = React.useState({
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
      dialog: (() => {
        if (!state.dialog) {
          const containerElement = document.createElement("div");
          document.body.appendChild(containerElement);

          const reactPortal = ReactDOM.createPortal(
            <div
              className={classes.root}
              onClick={(ev) => {
                if (ev.target === ev.currentTarget) {
                  _onClose();
                }
              }}
            >
              <Dialog open onClose={_onClose} />
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
                    _onClose();
                  }
                }}
              >
                <Dialog open onClose={_onClose} />
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

  /*
   * Crude body scroll lock when the dialog is open.
   */
  React.useEffect(() => {
    if (_open) {
      document.body.style.overflow = "hidden";

      open();

      return () => {
        document.body.style.overflow = "";
      };
    } else {
      close();
    }
  }, [_open]);

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
