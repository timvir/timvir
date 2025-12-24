import * as React from "react";
import { Bus } from "timvir/bus";
import { Node } from "../core/components/Page/types";

export interface Value {
  bus: Bus;

  articleComponents: {
    [Key in keyof React.JSX.IntrinsicElements]?:
      | React.FunctionComponent<React.JSX.IntrinsicElements[Key]>
      | keyof React.JSX.IntrinsicElements;
  };

  location: { asPath: string; push: (path: string) => void };
  Link: React.ComponentType<React.ComponentProps<"a"> & { href: string }>;

  /*
   * Configuration for blocks.
   */
  blocks?: {
    Exhibit?: {
      /**
       * If provided, Exhibit blocks will use this theme by default (unless overridden locally).
       *
       * If not set, default is to honor the prefers-color-scheme media feature.
       */
      theme?: "system" | "light" | "dark";
    };

    WebLink?: {
      unfurl: (url: string) => Promise<any>;
    };
  };

  toc: readonly Node[];
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
