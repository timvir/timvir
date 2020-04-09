import dynamic from "next/dynamic";
import React from "react";
import { theme } from "../../../../../packages/core";

export default ({ component, sample }) => {
  const Component = dynamic(() => import(`../../../../../components/${component}/samples/${sample}`));

  return (
    <div className={theme}>
      <Component />
    </div>
  );
};

export async function getStaticPaths() {
  const fs = await import("fs");
  const path = await import("path");

  const components = await fs.promises.readdir("src/components");

  const paths = [];
  for (const component of components) {
    try {
      const samples = await fs.promises.readdir(`src/components/${component}/samples`);
      for (const sample of samples) {
        paths.push({ params: { component, sample: path.basename(sample, path.extname(sample)) } });
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
