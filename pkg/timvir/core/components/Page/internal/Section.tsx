import * as React from "react";
import { useContext } from "timvir/context";
import { Node } from "../types";
import SidebarItem from "./SidebarItem";

interface Props extends Node {
  depth: number;
}

function Section(props: Props) {
  const { depth, path, children = [] } = props;

  const { location } = useContext();

  const [active, setActive] = React.useState<boolean>(() => {
    if (path) {
      return location.asPath.startsWith(path);
    } else if (children.length > 0) {
      return children.some(({ path }) => path && location.asPath.startsWith(path));
    } else {
      return false;
    }
  });

  React.useEffect(() => {
    if (path && location.asPath.startsWith(path)) {
      setActive(true);
    }
  }, [path, location.asPath]);

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

export default Section;
