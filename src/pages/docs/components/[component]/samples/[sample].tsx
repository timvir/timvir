import { theme } from "@timvir/core";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import * as React from "react";

export default function Page({ component, sample }) {
  const { isFallback } = useRouter();
  if (isFallback) {
    return null;
  }

  const Component = (() => {
    if (component === "Page" || component === "Footer" || component === "NavigationFooter") {
      return dynamic(() => import(`../../../../../../pkg/core/components/${component}/samples/${sample}.tsx`));
    } else if (component === "Arbitrary" || component === "WebLink") {
      return dynamic(() => import(`../../../../../../pkg/blocks/${component}/samples/${sample}.tsx`));
    } else {
      return dynamic(() => import(`../../../../../components/${component}/samples/${sample}.tsx`));
    }
  })();

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
