import { Swatch } from "pkg/blocks";
import * as React from "react";
import { ColorBook } from "..";
import { ColorBar } from "../../ColorBar";
import { Exhibit } from "../../Exhibit";

export default function Sample() {
  const [selectedChapter, onSelectChapter] = React.useState<undefined | number>(0);

  return (
    <>
      <ColorBook
        selectedChapter={selectedChapter}
        onSelectChapter={onSelectChapter}
        chapters={chapters.map((x) => x.chapter)}
      />

      {selectedChapter !== undefined &&
        (() => {
          const extra = chapters[selectedChapter].extra;
          return <div style={{ marginTop: 24 }}>{extra}</div>;
        })()}
    </>
  );
}

const chapters = [
  {
    chapter: {
      name: "Salmon",
      values: ["#FFB7A5", "#E9947D", "#D17257", "#B85033", "#9E2B0E"],
    },
    extra: (
      <>
        <h1 style={{ textAlign: "center", margin: "2em 0 .5em", fontWeight: 600 }}>Salmon</h1>

        <Exhibit caption="Main Colors">
          <ColorBar
            values={[
              "#69392C",
              "#9D5641",
              "#D17257",
              "#D7846D",
              "#DD9682",
              "#E3A898",
              "#E9BBAD",
              "#EFCDC3",
              "#F5DFD9",
              "#FAF1EE",
            ].reverse()}
          />
        </Exhibit>
        <div style={{ marginTop: 24 }}>
          <Swatch value="#D17257" contrastValue="white" name="Primary" ancestry="Salmon 200" />
        </div>
        <p>
          Aliquam etiam erat velit scelerisque in dictum non consectetur a. Justo laoreet sit amet cursus. A scelerisque
          purus semper eget duis at tellus at. Nisl nisi scelerisque eu ultrices vitae auctor. Libero nunc consequat
          interdum varius sit. Maecenas sed enim ut sem viverra aliquet eget sit. Placerat vestibulum lectus mauris
          ultrices eros in cursus turpis. Arcu cursus euismod quis viverra nibh cras.
        </p>
      </>
    ),
  },
  {
    chapter: {
      name: "Lavender",
      values: ["#FFB3D0", "#EB91AF", "#D56F90", "#BF4B72", "#A82255"],
    },
    extra: (
      <>
        <h1 style={{ textAlign: "center", margin: "2em 0 .5em", fontWeight: 600 }}>Lavender</h1>
        <Exhibit caption="Main Colors">
          <ColorBar
            values={[
              "#644321",
              "#7B432B",
              "#923E35",
              "#A9404D",
              "#BF4B72",
              "#C96198",
              "#D378B8",
              "#DC90D4",
              "#E0A7E5",
              "#E1C0ED",
              "#E8D9F5",
            ].reverse()}
          />
        </Exhibit>
        <div style={{ marginTop: 24 }}>
          <Swatch value="#EB91AF" contrastValue="black" name="Primary" ancestry="Lavender 100" />
        </div>
        <p>
          Vehicula ipsum a arcu cursus vitae congue mauris rhoncus. Ac orci phasellus egestas tellus rutrum tellus
          pellentesque eu. Tristique senectus et netus et malesuada fames. Augue neque gravida in fermentum et
          sollicitudin. Massa tempor nec feugiat nisl pretium fusce id velit ut. Sapien pellentesque habitant morbi
          tristique. Consectetur adipiscing elit duis tristique sollicitudin. Fermentum iaculis eu non diam phasellus
          vestibulum lorem.
        </p>
      </>
    ),
  },
  {
    chapter: {
      name: "Affair",
      values: ["#E1BAE1", "#BF93BE", "#9D6D9C", "#7C497B", "#5C255C"],
    },
  },
  {
    chapter: {
      name: "Gigas",
      values: ["#D6CCFF", "#B7A8E8", "#9784D2", "#7763BC", "#5642A6"],
    },
  },
  {
    chapter: {
      name: "Tabasco",
      values: ["#FFB7A5", "#E9947D", "#D17257", "#B85033", "#9E2B0E"],
    },
  },
  {
    chapter: {
      name: "Gossamer",
      values: ["#97F3EB", "#78D5CC", "#58B8AE", "#369C91", "#008075"],
    },
  },
  {
    chapter: {
      name: "Fern",
      values: ["#B1ECB5", "#8DCD8F", "#6AAE6A", "#469047", "#1D7324"],
    },
  },
];
