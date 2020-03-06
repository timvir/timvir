import { template } from "../template";

export default template(`
import React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "{{= it.Root }}";

/**
 * TODO: Document Me!
 */
interface Props extends React.ComponentPropsWithoutRef<typeof Root> {}

function {{= it.name }}({ ...props }: Props, ref: any /* FIXME */) {
  return (
    <Root ref={ref} {...props}>
      {{= it.name }}
    </Root>
  );
}

export default React.forwardRef({{= it.name }})
`);
