import { MDXProviderComponents } from "@mdx-js/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Code } from "../components/Code";
import { Search } from "../components/Search";
import { defaultSearch } from "../components/Search/Search";
import { Page } from "../packages/core";
import toc from "./toc";

const search = {
  Component: (props: { open: boolean }) => (
    <Search location={useRouter()} Link={Link} toc={toc} {...props} {...defaultSearch(toc)} />
  ),
};

const mdxComponents: MDXProviderComponents = {
  code: (props) => {
    const [, language = "markdown"] = (props.className || "").match(/^language-(.*)$/) || [];
    return <Code language={language}>{props.children}</Code>;
  },
};

export default ({ children }) => (
  <Page location={useRouter()} Link={Link} toc={toc} search={search} mdxComponents={mdxComponents}>
    {children}
  </Page>
);
