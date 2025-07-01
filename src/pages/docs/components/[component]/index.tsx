import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "node:querystring";
import Wrapper from "../../../../timvir/wrapper";

interface Query extends ParsedUrlQuery {
  component: string;
}

interface Props {
  component: string;
}

export default function Page({ component }: Props) {
  const { isFallback } = useRouter();
  if (isFallback) {
    return <Wrapper />;
  }

  const Component = (() => {
    if (component === "Page" || component === "Footer" || component === "NavigationFooter") {
      return dynamic(() => import(`../../../../../pkg/timvir/core/components/${component}/docs/index.mdx`));
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
      return dynamic(() => import(`../../../../../pkg/timvir/blocks/${component}/docs/index.mdx`));
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

export const getStaticProps: GetStaticProps<Props, Query> = async ({ params }) => {
  return { props: { ...params! } };
};
