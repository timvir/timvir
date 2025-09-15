import * as stylex from "@stylexjs/stylex";
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
              {...stylex.props(styles.root)}
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
                {...stylex.props(styles.root)}
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
              <div {...stylex.props(styles.root)}>
                <Dialog
                  onDispose={() => {
                    setState({
                      dialog: (() => {
                        if (!_open && state.dialog) {
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
  // biome-ignore lint/correctness/useExhaustiveDependencies: TODO
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

const styles = stylex.create({
  root: {
    position: "fixed",
    inset: "0px",
    display: "flex",
    zIndex: 900,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "13vh 16px 16px",

    fontFamily: "system-ui, sans-serif",
    fontFeatureSettings: '"liga", "kern"',
    textRendering: "optimizelegibility",

    fontSize: "16px",
    lineHeight: 1.725,
  },
});
