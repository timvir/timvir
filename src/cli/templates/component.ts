import { template } from "../template";

export default template(`
import * as React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "{{= it.Root }}";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {}

function {{= it.name }}(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const { ...rest } = props;

  return (
    <Root ref={ref} {...rest}>
      {{= it.name }}
    </Root>
  );
}

export default React.forwardRef({{= it.name }})
`);
