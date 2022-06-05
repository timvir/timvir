import * as React from "react";
import { Arbitrary } from "../index.js";
import { useContext } from "../context.js";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Arbitrary>>;

export default function Sample(props: Props) {
  return (
    <Arbitrary {...props}>
      <Component />
    </Arbitrary>
  );
}

function Component() {
  const { seed } = useContext();
  return <div style={{ padding: 40, display: "grid", placeItems: "center" }}>{seed}</div>;
}
