import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Page, extendedWidth, fullWidth } from "..";

export default function Sample() {
  return (
    <Page toc={[]} Link={Link} location={useRouter()}>
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
};
