import type * as React from "react";
import { Font } from "../..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Font>>;

export default function Sample(props: Props) {
  return (
    <Font
      name="h3"
      font={{ style: { fontFamily: "system-ui", fontWeight: 590, fontSize: "1.0625rem", lineHeight: 1.4705882353 } }}
      {...props}
    >
      Francke foundry in Danzig
    </Font>
  );
}
