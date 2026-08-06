"use client";

import * as React from "react";
import { useContext } from "timvir/context";
import type { Node } from "../types";
import { SidebarItem } from "./SidebarItem";

interface Props extends Node {
  depth: number;
}

export function Section(props: Props) {
  const { depth, path, children = [] } = props;

  const { navigation } = useContext();
  const { usePathname } = navigation;
  const pathname = usePathname();

  const [active, setActive] = React.useState<boolean>(() => {
    if (path) {
      return pathname.startsWith(path);
    } else if (children.length > 0) {
      return children.some(({ path }) => path && pathname.startsWith(path));
    } else {
      return false;
    }
  });

  React.useEffect(() => {
    if (path && pathname.startsWith(path)) {
      setActive(true);
    }
  }, [path, pathname]);

  return (
    <section>
      <SidebarItem {...props} active={active} setActive={setActive} />

      {active && children.length > 0 && (
        <div>
          {children.map((c, i) => (
            <Section key={i} depth={depth + 1} {...c} />
          ))}
        </div>
      )}
    </section>
  );
}
