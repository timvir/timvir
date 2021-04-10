import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import * as React from "react";
import { theme } from "../../../../../packages/core";

export default function Page({ component, sample }) {
  const { isFallback } = useRouter();
  if (isFallback) {
    return null;
  }

  const Component = dynamic(() => import(`../../../../../components/${component}/samples/${sample}.tsx`));

  return (
    <div className={theme}>
      <Component />
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  return { props: { ...params } };
}
