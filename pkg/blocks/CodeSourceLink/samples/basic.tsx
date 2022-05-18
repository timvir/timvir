import * as React from "react";
import { CodeSourceLink } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof CodeSourceLink>>;

export default function Sample(props: Props) {
  return (
    <CodeSourceLink
      url="https://github.com/timvir/timvir/tree/master/pkg/timvir/blocks/CodeSourceLink/CodeSourceLink"
      {...props}
    >
      <div>View source on Github</div>
    </CodeSourceLink>
  );
}
