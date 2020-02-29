import { template } from "../template";

export default template(`
import * as React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Component = "{{= it.Component }}";

/**
 * TODO: Document Me!
 */
interface Props extends React.ComponentPropsWithoutRef<typeof Component> {}

function {{= it.name }}({ ...props }: Props, ref: any /* FIXME */) {
  return (
    <Component ref={ref} {...props}>
      {{= it.name }}
    </Component>
  );
}

export default React.forwardRef({{= it.name }})
`);
