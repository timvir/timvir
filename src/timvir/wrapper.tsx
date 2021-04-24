import { MDXProviderComponents } from "@mdx-js/react";
import { Code } from "pkg/blocks";
import { Footer, Page } from "@timvir/core";
import { defaultSearch, Search } from "@timvir/search";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import routes from "./routes";
import toc from "./toc";

const search: React.ComponentPropsWithoutRef<typeof Page>["search"] = {
  Component: function Component(props) {
    return <Search {...props} {...defaultSearch(toc)} />;
  },
};

const mdxComponents: MDXProviderComponents = {
  code: function code(props: any) {
    const [, language = "markdown"] = (props.className || "").match(/^language-(.*)$/) || [];
    return <Code language={language}>{props.children}</Code>;
  },
};

export default function Wrapper({ children }: { children?: React.ReactNode }) {
  return (
    <Page
      location={useRouter()}
      Link={Link_ as any}
      toc={toc}
      search={search}
      mdxComponents={mdxComponents}
      Footer={() => (
        <Footer
          links={[
            {
              group: "Docs",
              items: [
                { label: "Getting Started", href: "/docs" },
                // { label: "Components", href: "/docs/components" },
              ],
            },
            { group: "Community", items: [{ label: "GitHub", href: "https://github.com/timvir/timvir" }] },
          ]}
        />
      )}
    >
      {children}
    </Page>
  );
}

const getHref = (to: string) => {
  if (routes[to]) {
    return to;
  } else {
    for (const [pathname, re] of Object.entries(routes)) {
      const match = to.match(re);
      if (match) {
        return { pathname, query: { ...match.groups } };
      }
    }
  }
};

function Link_(props: LinkProps) {
  if (typeof props.href === "string") {
    return <Link {...props} href={getHref(props.href)} as={props.href} />;
  } else {
    return <Link {...props} />;
  }
}
