import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { Page } from "../packages/page";
import toc from "./toc";

export default props => <Page location={useRouter()} Link={Link} toc={toc} {...props} />;
