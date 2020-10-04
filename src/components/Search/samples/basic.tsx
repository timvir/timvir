import React from "react";
import { Search } from "..";
import { useRouter } from "next/router";
import Link from "next/link";
import { defaultSearch } from "../Search";

const toc = [];

export default function Sample() {
  return <Search location={useRouter()} Link={Link} {...defaultSearch(toc)} open={false} />;
}
