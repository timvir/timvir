import { template } from "../template";

export default template(`
import React from "react";
import { {{= it.name }} } from "..";

export default (props: Partial<React.ComponentPropsWithoutRef<typeof {{= it.name }}>>) => {
  return <{{= it.name }} {...props} />;
}
`);
