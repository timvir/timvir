import * as React from "react";
import { Node } from "timvir/core";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  open?: boolean;
  onClose?: (ev: React.SyntheticEvent<HTMLElement>) => void;

  q: (query: string) => Promise<{
    totalCount: number;
    edges: Array<{ node: { path: string; label: string; context?: string } }>;
  }>;
}

function Search(_props: Props, _ref: React.ForwardedRef<React.ComponentRef<"div">>) {
  return null;
}

export default React.forwardRef(Search);

export function defaultSearch(toc: readonly Node[]) {
  return {
    q: async (query: string) => {
      const items = toc
        .flatMap((n) => flatten(n))
        .map((n) => ({
          ...n,
          score: (() => {
            const matchLength = n.path.toLowerCase().split(query.toLowerCase()).length - 1;
            return matchLength / n.path.length;
          })(),
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
