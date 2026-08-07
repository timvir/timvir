import Link from "next/link";
import type * as React from "react";
import { Page } from "..";

const navigation: React.ComponentPropsWithoutRef<typeof Page>["navigation"] = {
  usePathname: () => "/",
  Link,
};

export default function Sample() {
  return <Page toc={[]} navigation={navigation} />;
}
