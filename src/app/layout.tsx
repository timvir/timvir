import type { Viewport } from "next";
import * as React from "react";

import "./global.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  userScalable: false,
};

interface Props {
  children: React.ReactNode;
}

export default function Layout(props: Props) {
  const { children } = props;

  return (
    <html lang="en">
      <head>
        <script type="module" dangerouslySetInnerHTML={{ __html: require("timvir/core/theme/detector") }} />
      </head>

      <body>{children}</body>
    </html>
  );
}
