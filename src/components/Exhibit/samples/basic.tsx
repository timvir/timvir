import React from "react";
import { Exhibit } from "..";

export default () => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
    <Exhibit bleed={24}>
      <div
        style={{
          height: 40,
          padding: "0 16px",
          background: "teal",
          color: "white",
          display: "flex",
          alignItems: "center"
        }}
      >
        Hey, look here, look at my beauty!
      </div>
    </Exhibit>
  </div>
);
