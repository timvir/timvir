import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { Code } from "timvir/blocks";
import { Footer, Page } from "timvir/core";
import { defaultSearch, Search } from "timvir/search";
import routes from "./routes";
import toc from "./toc";

const search: React.ComponentPropsWithoutRef<typeof Page>["search"] = {
  Component: function Component(props) {
    return <Search {...props} {...defaultSearch(toc)} />;
  },
};

const mdxComponents = {
  pre: function pre(props: any) {
    const [, language = "markdown"] =
      (props.className ?? props.children?.props?.className ?? "").match(/^language-(.*)$/) || [];

    return <Code language={language}>{props.children?.props?.children ?? props.children ?? ""}</Code>;
  },
};

export default function Wrapper({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  if (router.isFallback) {
    return null;
  }

  return (
    <Page
      location={router}
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
