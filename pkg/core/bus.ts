import * as React from "react";
import { useImmer } from "use-immer";
import { filter, pipe, Source, Subject, subscribe } from "wonka";
import { useContext, Value } from "./context";

/**
 * The bus is a wonk Subject that represents a stream of Messages.
 */
export type Bus = Subject<Message>;

export type Message = Invoke<unknown>;

export interface Invoke<T> {
  type: "INVOKE";

  path: string;
  interface: string;
  member: string;
  body: T;
}

export function send<T>(context: Value, id: string, member: string, body: T) {
  context.bus.next({
    type: "INVOKE",
    path: `/dev/timvir/component/${id}`,
    interface: "dev.timvir.Props",
    member,
    body,
  });
}

export function useMailbox(id: string): Source<Message> {
  const { bus } = useContext();

  return React.useMemo(
    () =>
      pipe(
        bus.source,
        filter((x) => x.path === `/dev/timvir/component/${id}`)
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
