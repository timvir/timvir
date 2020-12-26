import dynamic from "next/dynamic";
import * as React from "react";
import Wrapper from "../../../../timvir/wrapper";

export default function Page({ component }) {
  const Component = dynamic(() => import(`../../../../components/${component}/docs/index.mdx`));

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
