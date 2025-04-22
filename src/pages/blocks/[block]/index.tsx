import Wrapper from "@/timvir/wrapper";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "node:querystring";
import * as React from "react";

interface Query extends ParsedUrlQuery {
  block: string;
}

interface Props {
    block: string;
}

export default function Page({ block }: Props) {
  const { isFallback } = useRouter();
  if (isFallback) {
    return <Wrapper />;
  }

  const Component = (() => {
    if (block === "Page" || block === "Footer" || block === "NavigationFooter") {
      return dynamic(() => import(`../../../../pkg/timvir/core/components/${block}/docs/index.mdx`));
    }  else {
      return dynamic(() => import(`../../../components/${block}/docs/index.mdx`));
    }
  })();

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

export const getStaticProps: GetStaticProps<Props, Query> = async ({ params }) => {
  return { props: { ...params! } };
};
