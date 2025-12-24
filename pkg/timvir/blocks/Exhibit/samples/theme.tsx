import { Exhibit } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Exhibit>>;

export default function Sample(props: Props) {
  if (!props.theme) {
    throw new Error("The 'theme' prop is required for this sample.");
  }

  return (
    <Exhibit
      {...props}
      caption={`Theme: ${props.theme}`}
      BackdropProps={{
        style: {
          color: { light: "black", dark: "white" }[props.theme],
        },
      }}
    >
      <div
        style={{
          padding: 20,
          display: "grid",
          placeItems: "center",
        }}
      >
        <div>
          This component requires a{" "}
          <u>
            <strong>{props.theme}</strong>
          </u>{" "}
          background.
        </div>
      </div>
    </Exhibit>
  );
}
