import * as React from "react";
import { useImmer } from "use-immer";
import { filter, makeSubject, pipe, Source, Subject, subscribe } from "wonka";
import { useContext } from "../context";
import { Message } from "./messages";

export * from "./messages";

/**
 * The bus is a wonka Subject that represents a stream of Messages.
 */
export type Bus = Subject<Message>;

export const makeBus = () => makeSubject<Message>();

/**
 * Send a message to the bus.
 */
export function send<T>(bus: Bus, id: string, member: string, body: T) {
  bus.next({
    type: "INVOKE",
    path: `/dev/timvir/element/${id}`,
    interface: "dev.timvir.Props",
    member,
    body,
  });
}

/**
 * A mailbox is a wonka source which receives messages for one specific element.
 */
export function useMailbox(id: string): Source<Message> {
  const { bus } = useContext();

  return React.useMemo(
    () =>
      pipe(
        bus.source,
        filter((x) => x.path === `/dev/timvir/element/${id}`)
      ),
    [bus, id]
  );
}

export function useProps<P extends { id?: string }>(props: P) {
  const mailbox = useMailbox(props.id!);

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

  return [
    { ...props, ...state.overrides },
    {
      hasOverrides: !!state.overrides,
      reset: () => {
        mutate((draft) => {
          draft.overrides = undefined;
        });
      },
    },
  ] as const;
}
