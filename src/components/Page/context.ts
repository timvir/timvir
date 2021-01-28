import Link from "next/link";
import * as React from "react";

export interface Value {
  location: { asPath: string; push: (path: string) => void };
  Link: typeof Link;

  /*
   * Configuration for blocks.
   */
  blocks?: {
    WebLink?: {
      unfurl: (url: string) => Promise<any>
    }
  }
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
