import { Head, Html, Main, NextScript } from "next/document";
import * as React from "react";

export default function Document() {
  return (
    <Html>
      <Head>
        <script type="module" dangerouslySetInnerHTML={{ __html: require("timvir/core/theme/detector") }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
