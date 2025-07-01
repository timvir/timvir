import { Cover } from "..";

import image from "../../../../../assets/daniel-leone-v7daTKlZzaw-unsplash.jpg";

export default function Sample() {
  return <Cover metadata={image} img={{ src: image.src }} sources={[]} />;
}
