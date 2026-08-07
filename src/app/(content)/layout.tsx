"use client";

import { useMDXComponents } from "mdx-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
import { Page } from "timvir/core";
import { defaultSearch, Search } from "timvir/search";
import toc from "../../timvir/toc";

const search: React.ComponentPropsWithoutRef<typeof Page>["search"] = {
  Component: function Component(props) {
    return <Search {...props} {...defaultSearch(toc)} />;
  },
};

const navigation: React.ComponentPropsWithoutRef<typeof Page>["navigation"] = {
  usePathname,
  Link: (props) => <Link {...props} prefetch={false} />,
};

interface Props {
  children: React.ReactNode;
}

export default function Layout(props: Props) {
  const { children } = props;

  return (
    <Page navigation={navigation} toc={toc} search={search} mdxComponents={useMDXComponents()}>
      {children}
    </Page>
  );
}
