import { template } from "../template";

export default template(`
import * as React from "react";
import { {{= it.name }} } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof {{= it.name }}>>;

export default function Sample(props: Props) {
  return <{{= it.name }} {...props} />;
}
`);
