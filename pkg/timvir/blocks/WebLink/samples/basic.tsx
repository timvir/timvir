import type * as React from "react";
import { WebLink } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof WebLink>>;

export default function Sample(props: Props) {
  return <WebLink url="https://github.com" {...props} />;
}
