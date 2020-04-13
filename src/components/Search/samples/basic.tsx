import React from "react";
import { Search } from "..";
import { useRouter } from "next/router";
import Link from "next/link";
import { defaultSearch } from "../Search";

const toc = [];

export default () => {
  return <Search location={useRouter()} Link={Link} toc={toc} {...defaultSearch(toc)} open={false} />;
};
