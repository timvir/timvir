import type * as React from "react";
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
            This font is for the main page heading. Its size is defined in terms of viewport width. Therefore it
            automatically scales with the viewport. To apply this style to an element, use the following code:
          </p>
          <Code language="css" style={{ "--timvir-margin": "0px" } as React.CSSProperties}>{`font-family: system-ui;
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
