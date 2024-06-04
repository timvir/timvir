import { css, cx } from "@linaria/core";
import { MDXProvider } from "@mdx-js/react";
import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { makeBus } from "timvir/bus";
import { Provider, Value } from "timvir/context";
import { useImmer } from "use-immer";
import { grid } from "../../layout";
import { theme } from "../../theme";
import { Commands } from "../Commands";
import { NavigationFooter } from "../NavigationFooter";
import * as mdxComponentsBase from "./components";
import { Sidebar } from "./internal";
import { Node } from "./types";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentProps<typeof Root> {
  toc: readonly Node[];

  location: { asPath: string; push: (path: string) => void };
  Link: React.ComponentType<React.ComponentProps<"a"> & { passHref?: boolean; legacyBehavior?: boolean }>;

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

function Page(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { location, toc, Link, className, search, mdxComponents, Footer, blocks, children, ...rest } = props;

  const [state, mutate] = useImmer({
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
      mutate((draft) => {
        draft.search.open = !draft.search.open;
      });
    },
    { enableOnFormTags: true }
  );

  useHotkeys(
    "escape",
    () => {
      mutate((draft) => {
        draft.search.open = false;
      });
    },
    { enableOnFormTags: true }
  );

  return (
    <Provider value={context}>
      <Root
        ref={ref}
        {...rest}
        className={cx(
          className,
          theme,
          css`
            min-height: 100vh;

            --timvir-page-margin: 16px;

            display: grid;
            grid-template-areas: "navigation" "content";

            @media (min-width: 48rem) {
              --timvir-page-margin: 24px;
              grid-template-areas: "navigation content";
              grid-template-columns: [l] 300px [m] 1fr [r];
            }
          `
        )}
      >
        <Sidebar
          className={css`
            grid-area: navigation;
            z-index: 1;
            background-color: var(--timvir-background-color);
            position: sticky;
            top: 0;

            @media (min-width: 48rem) {
              position: fixed;
              top: 0;
              bottom: 0;
              left: 0;
              width: 300px;

              border-right: 1px solid var(--timvir-border-color);
            }
          `}
          toc={toc}
          search={
            search && {
              open: () => {
                mutate((draft) => {
                  draft.search.open = true;
                });
              },
              ...search,
            }
          }
        />

        <div
          className={css`
            display: flex;
            flex-direction: column;
            grid-area: content;
          `}
        >
          <div className={grid}>
            <MDXProvider components={{ ...(mdxComponentsBase as any), ...mdxComponents }}>{children}</MDXProvider>
          </div>

          <div
            className={css`
              margin-top: auto;
            `}
          >
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
                <div
                  className={css`
                    margin-top: auto;
                    padding-top: 80px;
                  `}
                >
                  <NavigationFooter prev={toLink(index - 1)} next={toLink(index + 1)} />
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
              mutate((draft) => {
                draft.search.open = false;
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
