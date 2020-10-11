import * as React from "react";
import { NavigationFooter } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof NavigationFooter>>;

export default function Sample(props: Props) {
  return (
    <NavigationFooter
      prev={{ href: "/prev", label: "Prev Label", context: "Context" }}
      next={{ href: "/next", label: "Next Label", context: "Context" }}
      {...props}
    />
  );
}
