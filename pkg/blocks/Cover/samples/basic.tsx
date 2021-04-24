import * as React from "react";
import { Cover } from "..";

import { importImage } from "@zhif/macro";

export default function Sample() {
  return <Cover {...importImage("../../../../assets/daniel-leone-v7daTKlZzaw-unsplash.jpg")} />;
}
