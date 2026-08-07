"use client";

import * as stylex from "@stylexjs/stylex";
import * as React from "react";
import * as builtins from "timvir/builtins";
import { makeBus } from "timvir/bus";
import { Provider, type Value } from "timvir/context";
import { layoutStyles } from "../../layout";
import { Commands } from "../Commands";
import { NavigationFooter } from "../NavigationFooter";
import { Sidebar } from "./internal";
import type { Node } from "./types";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends Omit<React.ComponentProps<typeof Root>, "className" | "style"> {
  toc: readonly Node[];

  /**
   * @deprecated Use `navigation.usePathname` instead. Will be removed in a future version.
   */
  location?: { asPath: string; push: (path: string) => void };

  /**
   * This component is used to render links between pages.
   *
   * Timvir will always pass the 'href' prop to this component. That is unlike
   * the standard anchor element, which does not require it.
   *
   * @deprecated Use `navigation.Link` instead. Will be removed in a future version.
   */
  Link?: React.ComponentType<React.ComponentProps<"a"> & { href: string }>;

  /**
   * Framework-agnostic navigation integration. Supersedes `location`/`Link`.
   *
   * Exactly one of `navigation` or (`location` and `Link`) must be provided.
   *
   * Pass a referentially stable object (a module-level constant, or memoized in your
   * component).
   */
  navigation?: {
    /**
     * Returns the current pathname, excluding any query string or hash — matching the
     * contract of Next.js's own `usePathname()`.
     */
    usePathname: () => string;

    /**
     * This component is used to render links between pages.
     *
     * Timvir will always pass the 'href' prop to this component. That is unlike
     * the standard anchor element, which does not require it.
     */
    Link: React.ComponentType<React.ComponentProps<"a"> & { href: string }>;
  };

  /**
   * Overrides the built-in MDX component implementations.
   *
   * Timvir only provides styling for Markdown components, no interactivity or customization.
   * This is done to keep the core small. For example, code blocks do not provide syntax
   * highlighting. If you want to enable syntax highlighting in code blocks, use the
   * '<Code>' component from 'timvir/blocks'.
   */
  mdxComponents?: {
    [Key in keyof React.JSX.IntrinsicElements]?:
      | React.FunctionComponent<React.JSX.IntrinsicElements[Key]>
      | keyof React.JSX.IntrinsicElements;
  };

  /**
   * Search Configuration. When provided, then the Search menu will appear in the sidebar.
   */
  search?: {
    /**
     * The label that is used in th sidebar for the search menu.
     *
     * @default "Quick Search"
     */
    label?: React.ReactNode;

    /**
     * The Search component. It is always rendered in the DOM tree. When the search menu
     * is activated, then the 'open' prop is set to true.
     */
    Component: React.ComponentType<{
      open: boolean;
      onClose: (ev: React.SyntheticEvent<HTMLElement>) => void;
    }>;
  };

  /**
   * Optional footer which is shown at the bottom of every page.
   *
   * You can use any component here, though timvir provides a ready-made component which
   * should fit most use cases ('<Footer>').
   */
  Footer?: React.ComponentType<unknown>;

  /**
   * Configuration for blocks.
   */
  blocks?: Value["blocks"];
}

export function Page(props: Props) {
  const {
    toc,
    location,
    Link,
    navigation: navigationProp,
    search,
    mdxComponents,
    Footer,
    blocks,
    children,
    ...rest
  } = props;

  let navigation: Value["navigation"];
  if (navigationProp) {
    navigation = navigationProp;
  } else if (location && Link) {
    navigation = {
      // Adapter for the deprecated 'location'/'Link' props. Strips both the query string
      // and the hash, matching the 'usePathname' contract documented above.
      usePathname: () => new URL(location.asPath, "http://localhost").pathname,
      Link,
    };
  } else {
    throw new Error("timvir/core: 'Page' requires either the 'navigation' prop, or both 'location' and 'Link'.");
  }

  const [state, setState] = React.useState({
    search: {
      open: false,
    },
  });

  const [bus] = React.useState(makeBus);
  const context = React.useMemo<Value>(
    () => ({
      bus,
      articleComponents: {
        ...builtins,
        ...mdxComponents,
      },
      navigation,
      blocks,
      toc,
    }),
    [bus, mdxComponents, navigation, blocks, toc],
  );

  useHotkeys(
    {
      modifiers: ["meta"],
      key: "p",
    },
    (ev) => {
      ev.preventDefault();
      setState({
        search: {
          open: !state.search.open,
        },
      });
    },
  );

  useHotkeys(
    {
      modifiers: ["meta"],
      key: "k",
    },
    (ev) => {
      ev.preventDefault();
      setState({
        search: {
          open: !state.search.open,
        },
      });
    },
  );

  useHotkeys(
    {
      key: "escape",
    },
    (ev) => {
      if (state.search.open) {
        ev.preventDefault();
        setState({
          search: {
            open: false,
          },
        });
      }
    },
  );

  return (
    <Provider value={context}>
      <Root {...rest} {...stylex.props(styles.root)}>
        <Sidebar
          sx={styles.sidebar}
          toc={toc}
          search={
            search && {
              open: () => {
                setState({
                  search: {
                    open: true,
                  },
                });
              },
              ...search,
            }
          }
        />

        <div {...stylex.props(styles.contentContainer)}>
          <div {...stylex.props(styles.content, layoutStyles.grid)}>{children}</div>

          <div {...stylex.props(styles.marginTopAuto)}>
            <NavigationFooter navigation={navigation} toc={toc} />

            {Footer && <Footer />}
          </div>
        </div>
      </Root>

      <Commands
        open={state.search.open}
        onClose={() => {
          setState({
            search: {
              open: false,
            },
          });
        }}
      />
    </Provider>
  );
}

const styles = stylex.create({
  root: {
    minHeight: "100vh",
    "--timvir-page-margin": "16px",
    display: "grid",
    gridTemplateAreas: `"navigation" "content"`,

    "@media (min-width: 48rem)": {
      "--timvir-page-margin": "24px",
      gridTemplateAreas: `"navigation content"`,
      gridTemplateColumns: "[l] 300px [m] 1fr [r]",
    },

    fontFamily: "system-ui, sans-serif",
    fontFeatureSettings: '"liga", "kern"',
    textRendering: "optimizelegibility",

    fontSize: "0.9375rem",
    lineHeight: 1.7333,

    backgroundColor: "var(--timvir-background-color)",
    color: "var(--timvir-text-color)",
  },
  sidebar: {
    gridArea: "navigation",
    zIndex: 80,
    position: "sticky",
    top: 0,

    "@media (min-width: 48rem)": {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      width: 300,
      borderRight: "1px solid var(--timvir-border-color)",
    },
  },
  marginTopAuto: {
    marginTop: "auto",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    gridArea: "content",
  },
  content: {
    wordBreak: "break-word",
  },
});

function useHotkeys(
  trigger: {
    modifiers?: Array<"meta" | "ctrl" | "alt" | "shift">;
    key: string;
  },
  callback: (event: KeyboardEvent) => void,
) {
  const ref = React.useRef({ trigger, callback });
  React.useLayoutEffect(() => {
    ref.current = { trigger, callback };
  });

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (ref.current.trigger.key.toLowerCase() !== event.key.toLowerCase()) {
        return;
      }

      {
        const allModifiers: Array<"alt" | "ctrl" | "meta" | "shift"> = ["alt", "ctrl", "meta", "shift"];
        const expectedModifiers = ref.current.trigger.modifiers ?? [];
        for (const modifier of allModifiers) {
          if (event[`${modifier}Key`] !== expectedModifiers.includes(modifier)) {
            return;
          }
        }
      }

      ref.current.callback(event);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}
