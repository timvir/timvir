import Link from "next/link";
import * as React from "react";
import { Page } from "..";

export default function Sample() {
  return <Page toc={[]} Link={Link as any} location={{ asPath: "/", push: () => {} }} />;
}
