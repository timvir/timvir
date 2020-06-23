import React from "react";
import { Figma } from "..";

export default (props: Partial<React.ComponentPropsWithoutRef<typeof Figma>>) => {
  return <Figma url="https://www.figma.com/file/0FenYNPAo5wV7cmYPELaUE" {...props} />;
};
