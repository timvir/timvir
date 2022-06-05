import * as React from "react";
import { Message } from "../index.js";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Message>>;

export default function Sample(props: Props) {
  return <Message children={<>The component is a simple container for messages.</>} {...props} />;
}
