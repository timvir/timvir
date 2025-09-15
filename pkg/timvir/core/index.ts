import { filter, pipe, Source, subscribe } from "wonka";
import { Message } from "timvir/bus";
import { useContext } from "timvir/context";
import * as React from "react";

import * as builtins from "timvir/builtins";
export * from "./components/Footer";
export * from "./components/Page";

export { useContext } from "timvir/context";
export { layoutStyles, noLayout, extendedWidth, fullWidth, grid } from "./layout";

/**
 * A mailbox is a wonka source which receives messages for one specific block (identified by its id).
 */
export function useMailbox(id?: string): Source<Message> {
  const { bus } = useContext();

  return React.useMemo(
    () =>
      pipe(
        bus.source,
        filter((x) => (id ? x.path === `/dev/timvir/block/${id}` : false))
      ),
    [bus, id]
  );
}

export function useBlock<P extends { id?: string }>(props: P) {
  const { bus } = useContext();
  const mailbox = useMailbox(props.id);

  const [state, setState] = React.useState({
    overrides: undefined as undefined | Partial<P>,
  });

  React.useEffect(
    () =>
      pipe(
        mailbox,
        subscribe((msg: Message) => {
          if (msg.interface === "dev.timvir.Props") {
            if (msg.member === "set") {
              setState({
                overrides: msg.body as any,
              });
            } else if (msg.member === "merge") {
              setState({
                overrides: { ...(state.overrides as any), ...(msg.body as any) },
              });
            } else if (msg.member === "reset") {
              setState({
                overrides: undefined,
              });
            }
          }
        })
      ).unsubscribe,
    [mailbox, state.overrides]
  );

  return {
    bus,
    mailbox,
    props: { ...props, ...state.overrides },
    hasOverrides: !!state.overrides,
    reset: () => {
      setState({
        overrides: undefined,
      });
    },
  };
}

/**
 * This React hook returns a set of components that meant for use within a
 * Timvir page or custom block. The components are styled so that they fit
 * within the Timvir design system. You should use them to make the page
 * appear styled consistently.
 *
 * The set of components includes all the built-in components, as well as
 * any overrides and additions you have provided to the '<Page>' component.
 */
export function useArticleComponents() {
  return { ...builtins, ...useContext().articleComponents };
}
