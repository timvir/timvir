import type * as React from "react";
import { Footer } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Footer>>;

export default function Sample(props: Props) {
  return (
    <Footer
      links={[
        {
          group: "Excepteur",
          items: [
            { label: "Ullamcorper", href: "#" },
            { label: "Quam", href: "#" },
          ],
        },
        {
          group: "Nec nam aliquam",
          items: [
            { label: "Odio aenean", href: "#" },
            { label: "Feugiat", href: "#" },
            { label: "Nulla aliquet", href: "#" },
            { label: "Ultrices", href: "#" },
            { label: "Non curabitur", href: "#" },
          ],
        },
        {
          group: "Facilisis magna",
          items: [
            { label: "Viverra", href: "#" },
            { label: "Vel orci porta", href: "#" },
            { label: "Id interdum velit", href: "#" },
          ],
        },
        {
          group: "Mauris",
          items: [
            { label: "Fusce ut placerat", href: "#" },
            { label: "Non curabitur", href: "#" },
            { label: "Lacus luctus", href: "#" },
            { label: "Orci nulla", href: "#" },
          ],
        },
      ]}
      {...props}
    />
  );
}
