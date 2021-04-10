import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import * as React from "react";
import Wrapper from "../../../../timvir/wrapper";

export default function Page({ component }) {
  const { isFallback } = useRouter();
  if (isFallback) {
    return <Wrapper />;
  }

  const Component = dynamic(() => import(`../../../../components/${component}/docs/index.mdx`));

  return (
    <Wrapper>
      <Component />
    </Wrapper>
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
