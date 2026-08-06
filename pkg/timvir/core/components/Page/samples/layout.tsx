import * as stylex from "@stylexjs/stylex";
import Link from "next/link";
import type * as React from "react";
import { layoutStyles } from "../../../layout";
import { Page } from "..";

const navigation: React.ComponentPropsWithoutRef<typeof Page>["navigation"] = {
  usePathname: () => "/",
  Link,
};

export default function Sample() {
  return (
    <Page toc={[]} navigation={navigation}>
      <div
        {...stylex.props(layoutStyles.block)}
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
        {...stylex.props(layoutStyles.block, layoutStyles.extendedWidth)}
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
        {...stylex.props(layoutStyles.block, layoutStyles.fullWidth)}
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
