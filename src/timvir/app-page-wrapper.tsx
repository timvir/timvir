"use client";

import { useMDXComponents } from "mdx-components";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type * as React from "react";
import { Page } from "timvir/core";
import { defaultSearch, Search } from "timvir/search";
import toc from "./toc";

const search: React.ComponentPropsWithoutRef<typeof Page>["search"] = {
  Component: function Component(props) {
    return <Search {...props} {...defaultSearch(toc)} />;
  },
};

interface Props {
  children?: React.ReactNode;
}

export default function Wrapper(props: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { children } = props;

  return (
    <Page
      location={{ asPath: pathname!, push: router.push }}
      Link={Link}
      toc={toc}
      search={search}
      mdxComponents={useMDXComponents()}
    >
      {children}
    </Page>
  );
}
