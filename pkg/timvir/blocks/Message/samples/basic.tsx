import type * as React from "react";
import { Message } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Message>>;

export default function Sample(props: Props) {
  return (
    <Message {...props}>
      {props.children ??
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
    </Message>
  );
}
