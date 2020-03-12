import React from "react";
import { Card } from "..";
import { Sample } from "../../../../packages/macro";
import { Exhibit } from "../../Exhibit";

export default () => (
  <Card elevation={2} interactive>
    <Exhibit style={{ borderRadius: "3px 3px 0 0" }}>
      <div style={{ padding: 20, borderBottom: "1px solid rgba(16, 22, 26, 0.2)" }}>
        <Sample component="../../Swatch" variant="basic" style={{ height: "160px" }} />
      </div>
    </Exhibit>
    <div style={{ padding: "16px 20px" }}>Sample Card</div>
  </Card>
);
