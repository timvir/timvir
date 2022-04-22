import * as React from "react";
import { Card } from "..";
import { Image } from "../../Image";

import image from "../../../../assets/dominik-reallife-CwfVSbhi_9s-unsplash.jpg";

export default function Sample() {
  return (
    <Card>
      <Image
        metadata={image}
        img={{ src: image.src }}
        sources={[]}
        style={{ display: "block", width: "100%", height: "160px", borderRadius: "3px 3px 0 0", objectFit: "cover" }}
      />
      <div style={{ padding: 20 }}>Image Card</div>
    </Card>
  );
}
