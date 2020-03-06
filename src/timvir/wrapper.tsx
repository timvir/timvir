import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Page } from "../packages/core";
import toc from "./toc";

export default ({ children }) => (
  <Page location={useRouter()} Link={Link} toc={toc}>
    {children}
  </Page>
);
