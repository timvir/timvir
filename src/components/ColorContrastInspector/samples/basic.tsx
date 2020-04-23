import React from "react";
import { ColorContrastInspector } from "..";

export default (props: Partial<React.ComponentPropsWithoutRef<typeof ColorContrastInspector>>) => {
  return (
    <ColorContrastInspector
      background={["#FFFFFF", "#FAFAFA", "#00B1B2", "#142F4E"]}
      foreground={["#FFFFFF", "#DCDF5A", "#06838F", "#727272", "#333333", "#142F4E", "#000000"].reverse()}
      {...props}
    />
  );
};
