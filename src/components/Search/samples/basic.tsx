import React from "react";
import { Search } from "..";
import { defaultSearch } from "../Search";

const toc = [];

export default function Sample() {
  return <Search {...defaultSearch(toc)} open={false} />;
}
