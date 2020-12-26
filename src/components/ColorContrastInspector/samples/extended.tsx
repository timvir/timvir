import * as React from "react";
import { ColorContrastInspector } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof ColorContrastInspector>>;

export default function Sample(props: Props) {
  return (
    <ColorContrastInspector
      background={["#FFFFFF", "#FAFAFA", "#DCDF5A", "#00B1B2", "#06838F", "#727272", "#333333", "#142F4E", "#000000"]}
      foreground={["#FFFFFF", "#DCDF5A", "#06838F", "#727272", "#333333", "#142F4E", "#000000"].reverse()}
      {...props}
    />
  );
}
