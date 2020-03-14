import React from "react";
import { Message } from "..";

export default (props: Partial<React.ComponentPropsWithoutRef<typeof Message>>) => {
  return <Message children={<>The component is a simple container for messages.</>} {...props} />;
};
