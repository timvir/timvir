import type * as React from "react";
import { Font } from "../..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Font>>;

export default function Sample(props: Props) {
  return (
    <Font
      name="h2"
      font={{ style: { fontFamily: "system-ui", fontWeight: 590, fontSize: "1.5rem", lineHeight: 1.1666 } }}
      {...props}
    >
      Schmale Steinschrift
    </Font>
  );
}
