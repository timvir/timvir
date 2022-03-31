import { AppProps } from "next/app";
import Head from "next/head";
import * as React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          box-sizing: border-box;
          overscroll-behavior: none;
        }

        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }
      `}</style>

      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, shrink-to-fit=no" />

        <script>
          {themeDetector}
        </script>
      </Head>

      <Component {...pageProps} />
    </>
  );
}

const themeDetector = `
function useTheme(theme) {
  document.documentElement.setAttribute("data-timvir-theme", theme);
}

const theme = (() => {
  try {
    const theme = localStorage.getItem("timvir-theme");
    if (theme) {
      return theme;
    }
  } catch {}

  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    return "light";
  }
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
})()

if (theme) {
  useTheme(theme);
}
`
