import * as React from "react";
import { Exhibits } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Exhibits>>;

export default function Sample(props: Props) {
  return <Exhibits {...props} />;
}
