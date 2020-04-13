import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Search } from "../components/Search";
import { Page } from "../packages/core";
import toc from "./toc";
import { defaultSearch } from "../components/Search/Search";

const search = {
  Component: (props: { open: boolean }) => (
    <Search location={useRouter()} Link={Link} toc={toc} {...props} {...defaultSearch(toc)} />
  ),
};

export default ({ children }) => (
  <Page location={useRouter()} Link={Link} toc={toc} search={search}>
    {children}
  </Page>
);
