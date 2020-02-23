import { template } from "../template";

export default template(`
import * as React from "react";
import { {{= it.name }} } from "..";

export default () => (
  <{{= it.name }} />
)
`);
