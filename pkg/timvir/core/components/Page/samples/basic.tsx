import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { Page } from "../index.js";

export default function Sample() {
  return <Page toc={[]} Link={Link as any} location={useRouter()} />;
}
