import { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          box-sizing: border-box;
          overscroll-behavior: none;
          overflow-x: hidden;
          min-width: 0;
        }

        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }
      `}</style>

      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, shrink-to-fit=no" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
