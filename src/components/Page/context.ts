import Link from "next/link";
import * as React from "react";

interface Value {
  location: { asPath: string; push: (path: string) => void };
  Link: typeof Link;
}

const Context = React.createContext<undefined | Value>(undefined);
export const Provider = Context.Provider;

export function useContext(): Value {
  const value = React.useContext(Context);
  if (!value) {
    throw new Error("Page/useContext: Missing Provider");
  }

  return value;
}
