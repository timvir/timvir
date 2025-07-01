import { theme } from "timvir/core";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "node:querystring";

interface Query extends ParsedUrlQuery {
  component: string;
  sample: string;
}

interface Props {
  component: string;
  sample: string;
}

export default function Page({ component, sample }: Props) {
  const { isFallback } = useRouter();
  if (isFallback) {
    return null;
  }

  const Component = (() => {
    if (component === "Page" || component === "Footer" || component === "NavigationFooter") {
      return dynamic(() => import(`../../../../../../pkg/timvir/core/components/${component}/samples/${sample}.tsx`));
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
      return dynamic(() => import(`../../../../../../pkg/timvir/blocks/${component}/samples/${sample}.tsx`));
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

export const getStaticProps: GetStaticProps<Props, Query> = async ({ params }) => {
  return { props: { ...params! } };
};
