import { useProps } from "@timvir/core/bus";

export * from "./components/Footer";
export * from "./components/Page";
export * from "./context";
export { extendedWidth, fullWidth, grid } from "./layout";
export { theme } from "./theme";

export function useBlock<P extends { id?: string }>(props: P) {
  const [p, { hasOverrides, reset }] = useProps(props);

  return {
    props: p,
    hasOverrides,
    reset,
  };
}
