---
"timvir": patch
---

Add a `navigation` prop to `Page`, replacing `location`/`Link`

`Page` previously required a `location` prop (`{ asPath, push }`) and a separate `Link` prop.
The `location` prop was a plain value that consuming apps had to reconstruct on every render.
That forced `Page`'s entire subtree to re-render on every navigation, even for content that has nothing to do with the current route.

`Page` now accepts a `navigation` prop instead: `{ usePathname, Link }`.
Instead of resolving the current path once and stuffing it into context, `Page` and its internal components call `navigation.usePathname()` themselves wherever they need it.
Therefore only the parts of the UI that actually depend on the current path react to navigation.

The old `location` and `Link` props are now optional and deprecated.
They continue to work as before, and will be removed in a future version.
