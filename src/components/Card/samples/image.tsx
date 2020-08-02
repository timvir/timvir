import { Picture } from "@zhif/macro";
import React from "react";
import { Card } from "..";

export default function Sample() {
  return (
    <Card>
      <Picture
        src="../../../../assets/dominik-reallife-CwfVSbhi_9s-unsplash.jpg"
        style={{ display: "block", width: "100%", height: "160px", borderRadius: "3px 3px 0 0", objectFit: "cover" }}
      />
      <div style={{ padding: 20 }}>Image Card</div>
    </Card>
  );
}
