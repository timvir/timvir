"use client";

import { theme } from "timvir/core";

interface Props {
  params: Promise<{
    component: string;
    sample: string;
  }>;
}

export default async function Page(props: Props) {
  const { component, sample } = await props.params;

  const Component = await (async () => {
    if (component === "Page" || component === "Footer" || component === "NavigationFooter") {
      return import(`../../../../../../../pkg/timvir/core/components/${component}/samples/${sample}.tsx`);
    } else {
      return import(`../../../../../../../pkg/timvir/blocks/${component}/samples/${sample}.tsx`);
    }
  })().then((mod) => mod.default || mod);

  return (
    <div className={theme}>
      <Component />
    </div>
  );
}
