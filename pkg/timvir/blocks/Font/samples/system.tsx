import * as React from "react";
import { Font } from "../index.js";

export default function Sample() {
  return (
    <>
      <Font
        name="Heading 1"
        font={{ style: { fontFamily: "system-ui", fontWeight: 700, fontSize: "5vw", lineHeight: 1.3 } }}
      >
        Lateropulsion
      </Font>

      <Font
        name="Heading 2"
        font={{ style: { fontFamily: "system-ui", fontWeight: 700, fontSize: "2vw", lineHeight: 1.3 } }}
      >
        The basic structure of each upright letter remained the same in its italic companion.
      </Font>

      <Font name="Heading 3" font={{ style: { fontFamily: "system-ui", fontSize: 18 } }}>
        Originally called Neuste schmale fette Zeitungs-Grotesk, the design was listed in this catalogue as Enge fette
        Grotesque. It was a straight-sided sans serif with rounded terminals, and it bears no relation to any styles of
        Akzidenz-Grotesk. The remaining three sans serif designs in that undated, post-sale catalogue were Schmale
        magere Grotesque, Breite Grotesque, and Breite fette Grotesque.
      </Font>

      <Font name="Heading 4" font={{ style: { fontFamily: "system-ui", fontSize: 14 } }}>
        Meta Text
      </Font>
    </>
  );
}
