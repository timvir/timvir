import fuzzaldrin from "fuzzaldrin-plus";
import React from "react";

interface Props {
  string: string;
  query: string;
}

const Highlight = ({ string, query }: Props) => {
  const match = fuzzaldrin.wrap(string, query);
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: match.length === 0 ? string : match,
      }}
    />
  );
};

export default Highlight;
