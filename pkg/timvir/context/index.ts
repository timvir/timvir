import * as React from "react";
import { Bus } from "timvir/bus";

export interface Value {
  bus: Bus;

  location: { asPath: string; push: (path: string) => void };
  Link: React.ComponentType<{ href: string; children?: React.ReactNode }>;

  /*
   * Configuration for blocks.
   */
  blocks?: {
    WebLink?: {
      unfurl: (url: string) => Promise<any>;
    };
  };
}

const Context = React.createContext<undefined | Value>(undefined);
export const Provider = Context.Provider;

export function useContext(): Value {
  const value = React.useContext(Context);
  if (!value) {
    throw new Error("timvir/context: missing provider");
  }

  return value;
}
