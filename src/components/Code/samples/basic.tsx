import React from "react";
import { Code } from "..";

export default (props: Partial<React.ComponentPropsWithoutRef<typeof Code>>) => (
  <Code {...props}>export const answer = 42;</Code>
);
