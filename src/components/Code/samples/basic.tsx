import React from "react";
import { Code } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Code>>;

export default (props: Props) => <Code {...props}>export const answer = 42;</Code>;
