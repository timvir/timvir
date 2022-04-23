import { useMDXComponents } from "@mdx-js/react";
import { useContext } from "@timvir/core";
import { send } from "@timvir/core/bus";
import * as React from "react";

export default function Sample({ target, children }: any) {
  const context = useContext();

  const components = { a: "a", ...useMDXComponents() };

  return (
    <components.a
      href="#"
      role="button"
      onClick={(ev) => {
        ev.preventDefault();
        send(context.bus, "sample", "merge", {
          src: targets[target as any as keyof typeof targets],
        });
      }}
    >
      {children}
    </components.a>
  );
}

const targets = {
  local: "/docs/components/Grid/samples/basic",
  public: "https://www.example.com",
};
