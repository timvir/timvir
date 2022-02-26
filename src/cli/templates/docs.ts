import { template } from "../template";

export default template(`
import { Exhibit } from "@timvir/blocks";

# {{= it.name }}

<Exhibit>
  <Sample variant="basic" />
</Exhibit>

`);
