import Link from "next/link";
import type * as React from "react";
import type { Value } from "timvir/context";
import { Page } from "../../Page";
import { NavigationFooter } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof NavigationFooter>>;

const navigation: Value["navigation"] = {
  usePathname: () => "/current",
  Link,
};

const toc = [
  { label: "Prev Label", path: "/prev" },
  { label: "Current Label", path: "/current" },
  { label: "Next Label", path: "/next" },
];

export default function Sample(props: Props) {
  return (
    <Page navigation={navigation} toc={toc}>
      <NavigationFooter {...props} navigation={props.navigation ?? navigation} toc={props.toc ?? toc} />
    </Page>
  );
}
