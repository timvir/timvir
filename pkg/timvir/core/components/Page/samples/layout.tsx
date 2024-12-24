import { extendedWidth, fullWidth } from "timvir/core";
import Link from "next/link";
import * as React from "react";
import { Page } from "..";

export default function Sample() {
  return (
    <Page toc={[]} Link={Link as any} location={{ asPath: "/", push: () => {} }}>
      <div
        style={{
          marginTop: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 100,
          background: "teal",
          color: "white",
        }}
      >
        default
      </div>

      <div
        className={extendedWidth}
        style={{
          marginTop: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 100,
          background: "teal",
          color: "white",
        }}
      >
        extendedWidth
      </div>

      <div
        className={fullWidth}
        style={{
          marginTop: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 100,
          background: "teal",
          color: "white",
        }}
      >
        fullWidth
      </div>
    </Page>
  );
}
