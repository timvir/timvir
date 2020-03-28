import dynamic from "next/dynamic";
import React from "react";
import Wrapper from "../../../../../timvir/wrapper";

export default ({ component, sample }) => {
  const Component = dynamic(() => import(`../../../../../components/${component}/samples/${sample}`));

  return (
    <Wrapper>
      <Component />
    </Wrapper>
  );
};

export async function getStaticPaths() {
  const fs = await import("fs");
  const components = await fs.promises.readdir("src/components");

  const paths = [];
  for (const component of components) {
    try {
      const samples = await fs.promises.readdir(`src/components/${component}/samples`);
      for (const sample of samples) {
        paths.push({ params: { component, sample } });
      }
    } catch {}
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return { props: { ...params } };
}
