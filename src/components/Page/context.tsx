import * as React from "react";
import { makeSubject, pipe, scan, Subject, Source, subscribe } from "wonka";

interface Value {
  postOffice: Map<string, Subject<unknown>>;
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

export function useMailbox(id: string): Source<unknown> {
  const { postOffice } = useContext();

  let subject = postOffice.get(id);
  if (!subject) {
    subject = makeSubject();
    postOffice.set(id, subject);
  }

  React.useEffect(() => () => postOffice.delete(id), [postOffice, id]);

  return subject.source;
}

export function send(context: Value, id: string, value: unknown) {
  const { next } = context.postOffice.get(id);
  next(value);
}
