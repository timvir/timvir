import { template } from "../template";

export default template(`
import React from "react";
import { {{= it.name }} } from "..";

export default () => (
  <{{= it.name }} />
)
`);
