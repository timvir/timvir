import * as React from "react";
import { Image } from "..";
import { importImage } from "@zhif/macro";

export default function Sample() {
  return <Image {...importImage("../../../../assets/khachik-simonian-nXOB-wh4Oyc-unsplash.jpg")} />;
}
