import React from "react";
import { ColorContrastInspector } from "..";

export default (props: Partial<React.ComponentPropsWithoutRef<typeof ColorContrastInspector>>) => {
  return <ColorContrastInspector {...props} />;
}
