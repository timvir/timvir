import React from "react";
import { WebLink } from "..";

export default (props: Partial<React.ComponentPropsWithoutRef<typeof WebLink>>) => {
  return <WebLink url="https://github.com" {...props} />;
}
