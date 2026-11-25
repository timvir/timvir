"use client";

import * as React from "react";
import { Exhibit } from "timvir/blocks";

/**
 * An exhibit with a switch that moves it down by 0.5px. The caption shows how
 * far the exhibit moved, which is less than 0.5px when the layout around the
 * exhibit absorbs part of the change.
 */
export function PixelOffset() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [nudge, setNudge] = React.useState(false);
  const [top, setTop] = React.useState<{ base?: number; nudged?: number }>({});

  React.useLayoutEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const measure = () => {
      const value = element.getBoundingClientRect().top + window.scrollY;
      setTop((top) => (nudge ? { ...top, nudged: value } : { base: value }));
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(document.documentElement);

    return () => {
      observer.disconnect();
    };
  }, [nudge]);

  const moved = top.base !== undefined && top.nudged !== undefined ? top.nudged - top.base : undefined;

  return (
    <div style={{ gridColumn: "lc / rc" }}>
      <label style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
        <input type="checkbox" checked={nudge} onChange={(event) => setNudge(event.target.checked)} />
        Move the exhibit down by 0.5px
      </label>

      <div style={{ paddingTop: nudge ? 0.5 : 0 }}>
        <Exhibit caption={nudge && moved !== undefined ? `Moved by ${moved}px` : "Not moved"}>
          <div
            ref={ref}
            style={{
              height: 64,
              background: "repeating-linear-gradient(to bottom, currentColor 0 1px, transparent 1px 2px)",
            }}
          />
        </Exhibit>
      </div>
    </div>
  );
}
