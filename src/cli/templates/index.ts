import { template } from "../template";

export default template(`
export { default as {{= it.name }} } from "./{{= it.name }}";
`);
