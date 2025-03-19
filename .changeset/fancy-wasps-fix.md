---
"timvir": patch
---

Relax Link type

The `Link` prop on `timvir/core` `<Page>` used to heavily lean on the type used by Next.js.
In particular, it claimed to support `passHref` and `legacyBehavior` props.
This is no longer the case.
The `Link` can now be a plain HTMLAnchorElement (ie. `<a>`), or any component which implements a compatible inteface.
