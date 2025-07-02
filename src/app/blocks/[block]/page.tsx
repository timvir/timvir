"use client";

import Wrapper from "@/timvir/app-page-wrapper";

interface Props {
  params: Promise<{ block: string }>;
}

export default async function Page(props: Props) {
  const { block } = await props.params;

  const Component = await (async () => {
    if (block === "Page" || block === "Footer" || block === "NavigationFooter") {
      return import(`../../../../pkg/timvir/core/components/${block}/docs/index.mdx`);
    } else {
      return import(`../../../components/${block}/docs/index.mdx`);
    }
  })().then((mod) => mod.default || mod);

  return (
    <Wrapper>
      <Component />
    </Wrapper>
  );
}
