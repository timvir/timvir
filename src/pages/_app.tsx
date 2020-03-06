import React from "react";

export default ({ Component, pageProps }) => (
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
