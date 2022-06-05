import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { NavigationFooter } from "../index.js";
import { Page } from "../../Page/index.js";

type Props = Partial<React.ComponentPropsWithoutRef<typeof NavigationFooter>>;

export default function Sample(props: Props) {
  return (
    <Page location={useRouter()} Link={Link as any} toc={[]}>
      <NavigationFooter
        prev={{ href: "/prev", label: "Prev Label", context: "Context" }}
        next={{ href: "/next", label: "Next Label", context: "Context" }}
        {...props}
      />
    </Page>
  );
}
