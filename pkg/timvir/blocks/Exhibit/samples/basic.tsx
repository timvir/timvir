import * as React from "react";
import { Exhibit } from "..";

export default function Sample() {
  return (
    <Exhibit bleed={8} caption={`Explain what the exhibit is all about.`}>
      <div>Hey, look here, look at my beauty!</div>
    </Exhibit>
  );
}
