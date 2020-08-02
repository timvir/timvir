import React from "react";
import { Font } from "..";
import { Code } from "../../Code";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Font>>;

export default function Sample(props: Props) {
  return (
    <Font
      name="Heading 1"
      font={{ style: { fontFamily: "system-ui", fontWeight: 700, fontSize: "5vw", lineHeight: 1.3 } }}
      info={
        <>
          <p>
            This font is used for this and that. Its size is defined in terms of viewport width, as such it
            automatically scales with the viewport.
          </p>

          <Code language="css">{`font-family: system-ui;
font-weight: 700;
font-size: 5vw;
line-height: 1.3;`}</Code>
        </>
      }
      {...props}
    >
      Lateropulsion
    </Font>
  );
}
