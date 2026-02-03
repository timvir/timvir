import type * as React from "react";
import { Code } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Code>>;

export default function Sample(props: Props) {
  return <Code {...props}>export const answer = 42;</Code>;
}
