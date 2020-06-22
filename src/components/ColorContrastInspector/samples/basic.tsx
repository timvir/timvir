import React from "react";
import { ColorContrastInspector } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof ColorContrastInspector>>

export default (props: Props) => {
  return (
    <ColorContrastInspector
      background={["#FFFFFF", "#FAFAFA", "#00B1B2", "#142F4E"]}
      foreground={["#FFFFFF", "#DCDF5A", "#06838F", "#727272", "#333333"].reverse()}
      whitelist={[
        ["#FFFFFF", "#333333"],
        ["#FAFAFA", "#333333"],
        ["#FFFFFF", "#727272"],
        ["#FAFAFA", "#727272"],
        ["#FFFFFF", "#06838F"],
        ["#FAFAFA", "#06838F"],
        ["#142F4E", "#FFFFFF"],
        ["#142F4E", "#DCDF5A"],
        ["#00B1B2", "#FFFFFF"],
      ]}
      {...props}
    />
  );
};
