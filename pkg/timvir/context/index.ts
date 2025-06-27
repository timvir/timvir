import * as React from "react";
import { Bus } from "timvir/bus";
import { Node } from "../core/components/Page/types";

export interface Value {
  bus: Bus;

  mdxComponents: {
    [Key in keyof JSX.IntrinsicElements]?: React.Component<JSX.IntrinsicElements[Key]> | keyof JSX.IntrinsicElements;
  };

  location: { asPath: string; push: (path: string) => void };
  Link: React.ComponentType<React.ComponentProps<"a"> & { href: string }>;

  /*
   * Configuration for blocks.
   */
  blocks?: {
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
