import type { Viewport } from "next";
import * as React from "react";

import "./global.css";
import "timvir/global.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  userScalable: false,
};

interface Props {
  children: React.ReactNode;
}

const themeDetector = 'const t=Object.fromEntries(["light","dark"].map(t=>[t,(()=>{const n=window.matchMedia(`(prefers-color-scheme: ${t})`);return n.addEventListener("change",e),n})()]));function e(){const e=function(){try{const t=localStorage.getItem("timvir-theme");if(t)return t}catch{}for(const[e,n]of Object.entries(t))if(n.matches)return e}();e&&function(t){document.documentElement.setAttribute("data-timvir-theme",t)}(e)}e();';

export default function Layout(props: Props) {
  const { children } = props;

  return (
    <html lang="en">
      <head>
        <script type="module" dangerouslySetInnerHTML={{ __html: themeDetector }} />
      </head>

      <body>{children}</body>
    </html>
  );
}
