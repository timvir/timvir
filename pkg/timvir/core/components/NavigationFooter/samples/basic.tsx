import Link from "next/link";
import * as React from "react";
import { NavigationFooter } from "..";
import { Page } from "../../Page";

type Props = Partial<React.ComponentPropsWithoutRef<typeof NavigationFooter>>;

export default function Sample(props: Props) {
  return (
    <Page location={{ asPath: "/", push: () => {} }} Link={Link as any} toc={[]}>
      <NavigationFooter
        prev={{ href: "/prev", label: "Prev Label", context: "Context" }}
        next={{ href: "/next", label: "Next Label", context: "Context" }}
        {...props}
      />
    </Page>
  );
}
