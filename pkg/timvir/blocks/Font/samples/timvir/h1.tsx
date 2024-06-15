import * as React from "react";
import { Font } from "../..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Font>>;

export default function Sample(props: Props) {
  return (
    <Font
      name="h1"
      font={{ style: { fontFamily: "system-ui", fontWeight: 590, fontSize: "2rem", lineHeight: 1.125 } }}
      {...props}
    >
      Berthold type specimen No. 539A
    </Font>
  );
}
