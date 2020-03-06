import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Page } from "..";

export default () => <Page toc={[]} Link={Link} location={useRouter()} />;
