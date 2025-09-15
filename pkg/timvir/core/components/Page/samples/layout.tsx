import * as stylex from "@stylexjs/stylex";
import { layoutStyles } from "timvir/core";
import Link from "next/link";
import { Page } from "..";

export default function Sample() {
  return (
    <Page toc={[]} Link={Link as any} location={{ asPath: "/", push: () => {} }}>
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
