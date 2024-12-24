import { theme } from "timvir/core";
import * as React from "react";

interface Params {
  component: string;
  sample: string;
}

interface Props {
  params: Promise<Params>;
}

export default async function Page(props: Props) {
  const { component, sample } = await props.params;

  const Component = await (async () => {
    if (component === "Page" || component === "Footer" || component === "NavigationFooter") {
      return import(`../../../../../../../pkg/timvir/core/components/${component}/samples/${sample}.tsx`);
    } else if (
      [
        "Arbitrary",
        "Code",
        "ColorBar",
        "ColorBook",
        "Cover",
        "Exhibit",
        "Font",
        "Grid",
        "Icon",
        "Message",
        "Swatch",
        "Viewport",
        "WebLink",
      ].includes(component)
    ) {
      return import(`../../../../../../../pkg/timvir/blocks/${component}/samples/${sample}.tsx`);
    } else {
      return import(`../../../../../../components/${component}/samples/${sample}.tsx`);
    }
  })();

  return (
    <div className={theme}>
      <Component.default />
    </div>
  );
}
