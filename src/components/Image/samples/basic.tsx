import * as React from "react";
import { Image } from "..";

import image from "../../../../assets/khachik-simonian-nXOB-wh4Oyc-unsplash.jpg";

export default function Sample() {
  return <Image metadata={image} img={{ src: image.src }} sources={[]} />;
}
