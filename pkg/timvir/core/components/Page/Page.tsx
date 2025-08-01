"use client";

import { cx } from "@linaria/core";
import { MDXProvider } from "@mdx-js/react";
import * as stylex from "@stylexjs/stylex";
import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import * as mdxComponentsBase from "timvir/builtins";
import { makeBus } from "timvir/bus";
import { Provider, Value } from "timvir/context";
import { grid } from "../../layout";
import { theme } from "../../theme";
import { Commands } from "../Commands";
import { NavigationFooter } from "../NavigationFooter";
import { Sidebar } from "./internal";
import { Node } from "./types";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentProps<typeof Root> {
  toc: readonly Node[];

  location: { asPath: string; push: (path: string) => void };

  /**
   * This component is used to render links between pages.
   *
   * Timvir will always pass the 'href' prop to this component. That is unlike
   * the standard anchor element, which does not require it.
   */
  Link: React.ComponentType<React.ComponentProps<"a"> & { href: string }>;

  /**
   * Overrides the built-in MDX component implementations.
   *
   * Timvir only provides styling for Markdown components, no interactivity or customization.
   * This is done to keep the core small. For example, code blocks do not provide syntax
   * highlighting. If you want to enable syntax highlighting in code blocks, use the
   * '<Code>' component from 'timvir/blocks'.
   */
  mdxComponents?: React.ComponentPropsWithoutRef<typeof MDXProvider>["components"];

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

function Page(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const { location, toc, Link, search, mdxComponents, Footer, blocks, children, ...rest } = props;

  const [state, setState] = React.useState({
    search: {
      open: false,
    },
  });

  const [bus] = React.useState(makeBus);
  const context = React.useMemo<Value>(
    () => ({
      bus,
      location,
      Link,
      blocks,
      toc,
    }),
    [bus, location, Link, blocks, toc]
  );

  useHotkeys(
    "meta+p",
    (ev) => {
      ev.preventDefault();
      setState({
        search: {
          open: !state.search.open,
        },
      });
    },
    { enableOnFormTags: true }
  );

  useHotkeys(
    "escape",
    () => {
      setState({
        search: {
          open: false,
        },
      });
    },
    { enableOnFormTags: true }
  );

  const rootStyleProps = stylex.props(styles.root);

  return (
    <Provider value={context}>
      <Root
        ref={ref}
        {...rest}
        {...rootStyleProps}
        className={cx(rest.className, theme, rootStyleProps.className)}
        style={{ ...rest.style, ...rootStyleProps.style }}
      >
        <Sidebar
          {...stylex.props(styles.sidebar)}
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
          <div className={grid}>
            <MDXProvider components={{ ...(mdxComponentsBase as any), ...mdxComponents }}>{children}</MDXProvider>
          </div>

          <div {...stylex.props(styles.marginTopAuto)}>
            {(() => {
              function flatten(n: Node, parents: Node[]): Array<{ parents: Node[]; label: string; path: string }> {
                let ret: Array<{ parents: Node[]; label: string; path: string }> = [];

                if (n.path) {
                  ret.push({ parents, label: n.label, path: n.path });
                }

                if (n.children) {
                  ret = [...ret, ...n.children.flatMap((c) => flatten(c, [...parents, n]))];
                }

                return ret;
              }

              const items = toc.flatMap((n) => flatten(n, []));

              const index = items.findIndex((v) => v.path === location.asPath.replace(/#.*/, ""));
              if (index === -1) {
                return null;
              }

              function toLink(index: number) {
                const item = items[index];
                if (item === undefined) {
                  return undefined;
                } else {
                  return {
                    href: item.path,
                    label: item.label,
                    context: item.parents.map((x) => x.label).join(" / "),
                  };
                }
              }

              return (
                <div {...stylex.props(styles.footerContainer)}>
                  <NavigationFooter Link={Link} prev={toLink(index - 1)} next={toLink(index + 1)} />
                </div>
              );
            })()}

            {Footer && <Footer />}
          </div>
        </div>

        {search && (
          <search.Component
            {...state.search}
            onClose={() => {
              setState({
                search: {
                  open: false,
                },
              });
            }}
          />
        )}
      </Root>

      <Commands />
    </Provider>
  );
}

export default React.forwardRef(Page);

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
  },
  sidebar: {
    gridArea: "navigation",
    zIndex: 80,
    backgroundColor: "var(--timvir-background-color)",
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
  footerContainer: {
    marginTop: "auto",
    paddingTop: 80,
  },
});
