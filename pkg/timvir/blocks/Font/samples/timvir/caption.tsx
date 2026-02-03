import type * as React from "react";
import { Font } from "../..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Font>>;

export default function Sample(props: Props) {
  return (
    <Font
      name="caption"
      font={{ style: { fontFamily: "system-ui", fontSize: "0.8125rem", lineHeight: 1.1875 } }}
      info={
        <div>
          The font used for captions (such as under Exhibit, Code, and Viewport blocks). Captions usually use secondary
          text color.
        </div>
      }
      {...props}
    >
      By 1968, there were twenty-one.
    </Font>
  );
}
