import { Search } from "..";
import { defaultSearch } from "../Search";

const toc: any[] = [];

export default function Sample() {
  return <Search {...defaultSearch(toc)} open={false} />;
}
