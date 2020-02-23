import { template } from "../template";

export default template(`
import { {{= it.name }} } from "..";

# {{= it.name }}

<{{= it.name }} />

`);
