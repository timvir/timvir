import * as React from "react";
import { Live } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Live>>;

export default function Sample(props: Props) {
  return <Live {...props} />;
}
