import image from "../../../../../assets/daniel-leone-v7daTKlZzaw-unsplash.jpg";
import { Cover } from "..";

export default function Sample() {
  return <Cover metadata={image} img={{ src: image.src }} sources={[]} />;
}
