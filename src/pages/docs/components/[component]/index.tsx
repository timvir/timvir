import React from "react";
import { dynamicMap } from "../../../../../packages/macro";
import Wrapper from "../../../../timvir/wrapper";

const componentRegistry = dynamicMap("../../../../components/*/docs/index.mdx");

export default function Page({ component }) {
  const Component = componentRegistry[component];

  return (
    <Wrapper>
      <Component />
    </Wrapper>
  );
}

export async function getStaticPaths() {
  const fs = await import("fs");
  const components = await fs.promises.readdir("src/components");

  return {
    paths: components.map((component) => ({ params: { component } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return { props: { ...params } };
}
