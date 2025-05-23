import * as React from "react";
import { Message } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Message>>;

export default function Sample(props: Props) {
  return <Message {...props}>{props.children ?? "The component is a simple container for messages."}</Message>;
}
