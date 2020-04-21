import React from "react";
import { ColorBook } from "../ColorBook";
import { Inspector } from "./internal";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {}

function ColorContrastInspector({ ...props }: Props, ref: any /* FIXME */) {
  const [selectedChapter, setSelectedChapter] = React.useState<undefined | number>(1);

  const chapters = [
    {
      values: ["#FFB3D0", "#EB91AF", "#D56F90", "#BF4B72", "#A82255"],
    },
    {
      values: ["#E1BAE1", "#BF93BE", "#9D6D9C", "#7C497B", "#5C255C"],
    },
    {
      values: ["#D6CCFF", "#B7A8E8", "#9784D2", "#7763BC", "#5642A6"],
    },
    {
      values: ["#FFB7A5", "#E9947D", "#D17257", "#B85033", "#9E2B0E"],
    },
    {
      values: ["#97F3EB", "#78D5CC", "#58B8AE", "#369C91", "#008075"],
    },
    {
      values: ["#B1ECB5", "#8DCD8F", "#6AAE6A", "#469047", "#1D7324"],
    },
  ];

  return (
    <Root ref={ref} {...props}>
      <ColorBook selectedChapter={selectedChapter} onSelectChapter={setSelectedChapter} chapters={chapters} />

      <div style={{ marginTop: 40 }}>
        <Inspector values={chapters[selectedChapter]?.values || []} />
      </div>
    </Root>
  );
}

export default React.forwardRef(ColorContrastInspector);
