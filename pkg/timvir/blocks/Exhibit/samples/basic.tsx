import { Exhibit } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Exhibit>>;

export default function Sample(props: Props) {
  return (
    <Exhibit
      caption={"This Exhibit serves to illustrate how the block is structured and how you can use it."}
      {...props}
    >
      <div
        style={{
          backgroundColor: "#80008020",
          padding: 20,
          display: "grid",
          placeItems: "center",
        }}
      >
        This is a sample React component – a plain div with a semi-transparent magenta background color.
      </div>
    </Exhibit>
  );
}
