import * as React from "react";
import { Search } from "../index.js";
import { defaultSearch } from "../Search.js";

const toc: any[] = [];

export default function Sample() {
  return <Search {...defaultSearch(toc)} open={false} />;
}
