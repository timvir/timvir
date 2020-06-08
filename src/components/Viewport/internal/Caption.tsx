import { css } from "linaria";
import React from "react";
import * as pageComponents from "../../Page/components";

interface Props {
  src: string;
}

function Caption(props: Props) {
  const { src } = props;

  return (
    <figcaption
      className={css`
        font-size: 0.75rem;
        color: #999;
        white-space: nowrap;
      `}
    >
      Source:{" "}
      <pageComponents.a href={src} target="_blank">
        {src}
      </pageComponents.a>
    </figcaption>
  );
}

export default React.memo(Caption);
