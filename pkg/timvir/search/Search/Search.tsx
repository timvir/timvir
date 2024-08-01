import fuzzaldrin from "fuzzaldrin-plus";
import * as React from "react";
import { Node } from "timvir/core";
import { Dialog } from "./internal";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  open?: boolean;
  onClose?: (ev: React.SyntheticEvent<HTMLElement>) => void;

  q: (query: string) => Promise<{
    totalCount: number;
    edges: Array<{ node: { path: string; label: string; context?: string } }>;
  }>;
}

function Search(props: Props, ref: React.ForwardedRef<React.ElementRef<"div">>) {
  const { open, ...rest } = props;

  if (!open) {
    return null;
  } else {
    return <Dialog ref={ref} {...rest} />;
  }
}

export default React.forwardRef(Search);

export function defaultSearch(toc: readonly Node[]) {
  return {
    q: async (query: string) => {
      const preparedQuery = fuzzaldrin.prepareQuery(query);
      const items = toc
        .flatMap((n) => flatten(n))
        .map((n) => ({
          ...n,
          score: fuzzaldrin.score(n.path, query, {
            preparedQuery,
          }),
        }))
        .filter((n) => (query ? n.score > 0 : true))
        .sort((a, b) => b.score - a.score);

      return {
        totalCount: items.length,
        edges: items.slice(0, 10).map((e) => ({
          node: {
            path: e.path,
            label: e.path,
            context: "Page",
          },
        })),
      };
    },
  };
}

function flatten(n: Node): Array<{ label: string; path: string }> {
  let ret: Array<{ label: string; path: string }> = [];

  if (n.path) {
    ret.push({ label: n.label, path: n.path });
  }

  if (n.children) {
    ret = [...ret, ...n.children.flatMap(flatten)];
  }

  return ret;
}
