import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import * as React from "react";
import Wrapper from "../../../../timvir/wrapper";

export default function Page({ component }) {
  const { isFallback } = useRouter();
  if (isFallback) {
    return <Wrapper />;
  }

  const Component = (() => {
    if (component === "Page" || component === "Footer" || component === "NavigationFooter") {
      return dynamic(() => import(`../../../../../pkg/core/components/${component}/docs/index.mdx`));
    } else if (
      [
        "Arbitrary",
        "Code",
        "ColorBar",
        "ColorBook",
        "Cover",
        "Exhibit",
        "Font",
        "Grid",
        "Icon",
        "Message",
        "Swatch",
        "Viewport",
        "WebLink",
      ].includes(component)
    ) {
      return dynamic(() => import(`../../../../../pkg/blocks/${component}/docs/index.mdx`));
    } else {
      return dynamic(() => import(`../../../../components/${component}/docs/index.mdx`));
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

export async function getStaticProps({ params }) {
  return { props: { ...params } };
}
