import React from "react";
import { Figma } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Figma>>;

export default function Sample(props: Props) {
  return <Figma url="https://www.figma.com/file/0FenYNPAo5wV7cmYPELaUE" {...props} />;
}
