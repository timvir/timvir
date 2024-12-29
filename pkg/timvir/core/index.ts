import { filter, pipe, Source, subscribe } from "wonka";
import { Message } from "timvir/bus";
import { useContext } from "timvir/context";
import * as React from "react";
import { useImmer } from "use-immer";

export * from "./components/Footer";
export * from "./components/Page";

export { useContext } from "timvir/context";
export { extendedWidth, fullWidth, grid } from "./layout";
// export { theme } from "./theme";

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

  const [state, mutate] = useImmer({
    overrides: undefined as undefined | Partial<P>,
  });

  React.useEffect(
    () =>
      pipe(
        mailbox,
        subscribe((msg: Message) => {
          if (msg.interface === "dev.timvir.Props") {
            if (msg.member === "set") {
              mutate((draft) => {
                draft.overrides = msg.body as any;
              });
            } else if (msg.member === "merge") {
              mutate((draft) => {
                draft.overrides = { ...(draft.overrides as any), ...(msg.body as any) };
              });
            } else if (msg.member === "reset") {
              mutate((draft) => {
                draft.overrides = undefined;
              });
            }
          }
        })
      ).unsubscribe,
    [mailbox, mutate]
  );

  return {
    bus,
    mailbox,
    props: { ...props, ...state.overrides },
    hasOverrides: !!state.overrides,
    reset: () => {
      mutate((draft) => {
        draft.overrides = undefined;
      });
    },
  };
}
