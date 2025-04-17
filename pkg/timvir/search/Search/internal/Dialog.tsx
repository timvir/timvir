import { useContext } from "timvir/core";
import { useCombobox } from "downshift";
import { css, cx } from "@linaria/core";
import * as React from "react";
import { SearchBoxInput } from "../../SearchBoxInput";
import { SearchBoxListItem } from "../../SearchBoxListItem";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  onClose?: (ev: React.SyntheticEvent<HTMLElement>) => void;

  q: (query: string) => Promise<{
    totalCount: number;
    edges: Array<{ node: { path: string; label: string; context?: string } }>;
  }>;
}

function Dialog(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const { onClose, q, className, ...rest } = props;

  const { location, Link } = useContext();

  const [value, setValue] = React.useState("");
  const [result, setResult] = React.useState<
    | undefined
    | {
        totalCount: number;
        edges: Array<{ node: { path: string; label: string; context?: string } }>;
      }
  >(undefined);

  React.useEffect(() => {
    q(value).then((result) => {
      setResult(result);
    });
  }, [value, q, setResult]);

  const items = result?.edges ?? [];

  const { getMenuProps, getInputProps, /* highlightedIndex, */ getItemProps, closeMenu } = useCombobox({
    defaultHighlightedIndex: 0,
    items,
    itemToString: (item) => (item ? item.node.label : ""),
    onInputValueChange: ({ inputValue }) => {
      setValue(inputValue ?? "");
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        location.push(selectedItem.node.path);
      }
      closeMenu();
    },
  });

  return (
    <Root
      ref={ref}
      {...rest}
      className={cx(
        className,
        css`
          position: fixed;
          top: 0px;
          left: 0px;
          right: 0px;
          bottom: 0px;
          z-index: 999;
          pointer-events: none;
          overflow: hidden;

          font-family: system-ui, sans-serif;
          font-feature-settings: "liga", "kern";
          text-rendering: optimizelegibility;
          font-size: 14px;
          line-height: 1.725;
          color: var(--timvir-text-color);
        `
      )}
    >
      <div
        className={css`
          pointer-events: auto;
          position: relative;
          z-index: 0;
        `}
      >
        <div
          className={css`
            width: 100vw;
            height: 100vh;
            position: fixed;
            top: 0px;
            left: 0px;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            pointer-events: auto;
          `}
        >
          <div
            className={css`
              position: absolute;
              top: 0px;
              left: 0px;
              bottom: 0px;
              right: 0px;
              background: rgba(15, 15, 15, 0.6);
            `}
            onClick={onClose}
          />

          <div
            className={css`
              position: relative;
              z-index: 1;
              box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 5px 10px,
                rgba(15, 15, 15, 0.2) 0px 15px 40px;
              border-radius: 3px;
              background: white;
              top: 90px;
              overflow: hidden;
              width: 75%;
              max-width: 600px;
              min-height: 50px;
              max-height: 80vh;

              :global(:root[data-timvir-theme="dark"]) & {
                background: black;
              }
            `}
          >
            <SearchBoxInput {...getInputProps()} />
            <main
              {...getMenuProps()}
              className={css`
                width: 100%;
                height: 100%;
                overflow: hidden auto;
              `}
            >
              {items.map((item, index) => (
                <SearchBoxListItem
                  key={index}
                  as={Link}
                  href={item.node.path}
                  {...getItemProps({ item, index, onClick: onClose })}
                  icon={
                    <svg x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16">
                      <g fill="none" stroke="#444" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10}>
                        <path data-color="color-2" d="M4.5 11.5L11.5 11.5" />
                        <path data-color="color-2" d="M4.5 8.5L11.5 8.5" />
                        <path data-color="color-2" d="M4.5 5.5L6.5 5.5" />
                        <path d="M9.5 0.5L1.5 0.5 1.5 15.5 14.5 15.5 14.5 5.5z" />
                        <path d="M9.5 0.5L9.5 5.5 14.5 5.5" />
                      </g>
                    </svg>
                  }
                  label={item.node.path}
                  context={item.node.context}
                  style={
                    {
                      // background: highlightedIndex === index ? "rgba(0, 0, 0, 0.05)" : undefined,
                    }
                  }
                />
              ))}
            </main>
          </div>
        </div>
      </div>
    </Root>
  );
}

export default React.forwardRef(Dialog);
