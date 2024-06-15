import * as React from "react";
import { Font } from "../..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Font>>;

export default function Sample(props: Props) {
  return (
    <Font
      name="body1"
      font={{ style: { fontFamily: "system-ui", fontSize: "0.9375rem", lineHeight: 1.7333 } }}
      info={<div>This is the main font used for the page body.</div>}
      {...props}
    >
      The first of the folio’s two sans serifs was simply called Grotesque. This was a duplicate of the Moderne
      Steinschriften types created at the Benjamin Krebs Nachfolger typefoundry of Frankfurt am Main, published in 1865.
      The second was an italic named Cursiv-Grotesque, which probably came to Theinhardt from the J.H. Rust & Co.
      foundry of Offenbach am Main and Vienna. Rust had imported the larger sizes of this typeface from Americirca They
      then created the three smallest sizes themselves, publishing them in 1875.
    </Font>
  );
}
