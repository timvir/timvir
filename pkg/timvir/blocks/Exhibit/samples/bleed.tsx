import type * as React from "react";
import { Exhibit } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Exhibit>>;

export default function Sample(props: Props) {
  return (
    <Exhibit caption={`Bleed ${props.bleed ?? "<unset>"}`} {...props}>
      <div
        style={{
          backgroundColor: "#80008020",
          padding: 20,
          display: "grid",
          placeItems: "center",
        }}
      />
    </Exhibit>
  );
}
