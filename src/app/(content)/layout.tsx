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

const blocks: React.ComponentPropsWithoutRef<typeof Page>["blocks"] = {
  WebLink: {
    /*
     * Use the unfurl API route of this app. The default is the one on
     * production, which a deployment (or a local server) should not depend on.
     */
    unfurl: (url) => fetch(`/api/unfurl?url=${encodeURIComponent(url)}`).then((res) => res.json()),
  },
};

interface Props {
  children: React.ReactNode;
}

export default function Layout(props: Props) {
  const { children } = props;

  return (
    <Page navigation={navigation} toc={toc} search={search} mdxComponents={useMDXComponents()} blocks={blocks}>
      {children}
    </Page>
  );
}
