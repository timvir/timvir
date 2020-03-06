import React from "react";
import { ColorBook } from "..";

export default () => {
  const [selectedChapter, onSelectChapter] = React.useState(0);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 20 }}>
      <ColorBook
        selectedChapter={selectedChapter}
        onSelectChapter={onSelectChapter}
        chapters={[
          {
            values: ["#FFB7A5", "#E9947D", "#D17257", "#B85033", "#9E2B0E"]
          },
          {
            values: ["#FFB3D0", "#EB91AF", "#D56F90", "#BF4B72", "#A82255"]
          },
          {
            values: ["#E1BAE1", "#BF93BE", "#9D6D9C", "#7C497B", "#5C255C"]
          },
          {
            values: ["#D6CCFF", "#B7A8E8", "#9784D2", "#7763BC", "#5642A6"]
          },
          {
            values: ["#FFB7A5", "#E9947D", "#D17257", "#B85033", "#9E2B0E"]
          },
          {
            values: ["#97F3EB", "#78D5CC", "#58B8AE", "#369C91", "#008075"]
          },
          {
            values: ["#B1ECB5", "#8DCD8F", "#6AAE6A", "#469047", "#1D7324"]
          }
        ]}
      />
    </div>
  );
};
