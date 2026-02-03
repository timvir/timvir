import Link from "next/link";
import type * as React from "react";
import { Page } from "../../Page";
import { NavigationFooter } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof NavigationFooter>>;

export default function Sample(props: Props) {
  return (
    <Page location={{ asPath: "/", push: () => {} }} Link={Link} toc={[]}>
      <NavigationFooter
        Link={Link}
        prev={{ href: "/prev", label: "Prev Label", context: "Context" }}
        next={{ href: "/next", label: "Next Label", context: "Context" }}
        {...props}
      />
    </Page>
  );
}
