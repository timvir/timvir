import { useMDXComponents } from "mdx-components";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { Page } from "timvir/core";
import { defaultSearch, Search } from "timvir/search";
import toc from "./toc";

const search: React.ComponentPropsWithoutRef<typeof Page>["search"] = {
  Component: function Component(props) {
    return <Search {...props} {...defaultSearch(toc)} />;
  },
};

/*
 * Despite its name, 'useMDXComponents' is not a React Hook, it's a pure
 * function.
 */
const mdxComponents = useMDXComponents();

export default function Wrapper({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  if (router.isFallback) {
    return null;
  }

  return (
    <Page location={router} Link={Link} toc={toc} search={search} mdxComponents={mdxComponents}>
      {children}
    </Page>
  );
}
