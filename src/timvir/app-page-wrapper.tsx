"use client";

import { useMDXComponents } from "mdx-components";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { Page } from "timvir/core";
import { defaultSearch, Search } from "timvir/search";
import routes from "./routes";
import toc from "./toc";

const search: React.ComponentPropsWithoutRef<typeof Page>["search"] = {
  Component: function Component(props) {
    return <Search {...props} {...defaultSearch(toc)} />;
  },
};

const mdxComponents = useMDXComponents();

interface Props {
  children?: React.ReactNode;
}

export default function Wrapper({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Page
      location={{ asPath: pathname!, push: router.push }}
      Link={Link_ as any}
      toc={toc}
      search={search}
      mdxComponents={mdxComponents}
    >
      {children}
    </Page>
  );
}

const getHref = (to: string) => {
  if (to in routes) {
    return to;
  } else {
    for (const [pathname, re] of Object.entries(routes)) {
      const match = to.match(re);
      if (match) {
        return { pathname, query: { ...match.groups } };
      }
    }
  }

  return "#";
};

function Link_(props: LinkProps) {
  if (typeof props.href === "string") {
    return <Link {...props} href={getHref(props.href)} as={props.href} />;
  } else {
    return <Link {...props} />;
  }
}
