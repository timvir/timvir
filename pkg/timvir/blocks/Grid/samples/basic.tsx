import { Grid } from "..";

export default function Sample() {
  return (
    <Grid>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </Grid>
  );
}

function Item() {
  return (
    <div
      style={{
        height: 100,
        background: "rgba(0,0,0,.2)",
        display: "grid",
        placeItems: "center",
      }}
    >
      ITEM
    </div>
  );
}
