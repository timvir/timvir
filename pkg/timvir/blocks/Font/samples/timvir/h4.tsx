import * as React from "react";
import { Font } from "../..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Font>>;

export default function Sample(props: Props) {
  return (
    <Font
      name="h4"
      font={{ style: { fontFamily: "system-ui", fontWeight: 590, fontSize: "0.9375rem", lineHeight: 1.4375 } }}
      {...props}
    >
      Berthold and Bauer & Co.
    </Font>
  );
}
