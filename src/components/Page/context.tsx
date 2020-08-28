import * as React from "react";
import { filter, pipe, Source, Subject } from "wonka";

export interface Message {
  id: string;
}

interface Value {
  bus: Subject<Message>;
}

const Context = React.createContext<undefined | Value>(undefined);
export const Provider = Context.Provider;

export function useContext(): Value {
  const value = React.useContext(Context);
  if (!value) {
    throw new Error("…");
  }

  return value!;
}

export function useMailbox(id: string): Source<Message> {
  const { bus } = useContext();

  return pipe(
    bus.source,
    filter((x) => x.id === id)
  );
}

export function send<T extends Omit<Message, "id">>(context: Value, id: string, value: T) {
  context.bus.next({ id, ...value });
}
