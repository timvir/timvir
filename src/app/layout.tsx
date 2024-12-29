import * as React from "react";
import { theme } from "timvir/core";

import "./global.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={theme}>{children}</body>
    </html>
  );
}
