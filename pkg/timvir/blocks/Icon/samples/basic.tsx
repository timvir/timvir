import { Icon } from "..";

export default function Sample() {
  return (
    <Icon
      descriptor={{
        name: "ArrowRight",
        instances: [
          {
            size: 12,
            Component: function Component() {
              return (
                <svg width="12px" height="12px" viewBox="0 0 12 12" style={{ display: "block" }}>
                  <path fill="#444" d="M1.98 2.1L5.88 6 1.98 9.9 4.08 12 10.08 6 4.08 0 1.98 2.1z" />
                </svg>
              );
            },
          },
        ],
      }}
    />
  );
}
