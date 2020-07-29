import React from "react";

export default function App({ Component, pageProps }) {
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

      <Component {...pageProps} />
    </>
  );
}