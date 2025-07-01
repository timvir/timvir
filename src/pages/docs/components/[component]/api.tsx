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

  const Component = dynamic(() => import(`../../../../components/${component}/docs/api.mdx`));

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
