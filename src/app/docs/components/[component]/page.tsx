"use client";

import Wrapper from "@/timvir/app-page-wrapper";

interface Props {
  params: Promise<{
    component: string;
  }>;
}

export default async function Page(props: Props) {
  const { component } = await props.params;

  const Component = await (async () => {
    if (component === "Page" || component === "Footer" || component === "NavigationFooter") {
      return import(`../../../../../pkg/timvir/core/components/${component}/docs/index.mdx`);
    } else {
      return import(`../../../../../pkg/timvir/blocks/${component}/docs/index.mdx`);
    }
  })().then((mod) => mod.default || mod);

  return (
    <Wrapper>
      <Component />
    </Wrapper>
  );
}
