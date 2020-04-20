import React from "react";
import { FontFamilyMatrix } from "..";

export default (props: Partial<React.ComponentPropsWithoutRef<typeof FontFamilyMatrix>>) => {
  return (
    <FontFamilyMatrix
      fontFaces={[
        { name: "Light", style: { fontFamily: "system-ui", fontWeight: 300, fontStyle: "normal" } },
        { name: "Light Italic", style: { fontFamily: "system-ui", fontWeight: 300, fontStyle: "italic" } },
        { name: "Regular", style: { fontFamily: "system-ui", fontWeight: 500, fontStyle: "normal" } },
        { name: "Regular Italic", style: { fontFamily: "system-ui", fontWeight: 500, fontStyle: "italic" } },
        { name: "Bold", style: { fontFamily: "system-ui", fontWeight: 700, fontStyle: "normal" } },
      ]}
      {...props}
    />
  );
};
