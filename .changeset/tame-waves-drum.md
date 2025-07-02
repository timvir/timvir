---
"timvir": patch
---

Improve type of Page Link prop

The `Link` prop on the `<Page>` component is now type-compatible with the `<Link>` component from Next.js.
This is not a breaking change, not at runtime anyways.
There is a small chance that TypeScript will raise a type error.
But it's more likely that you can remove a `as any` type cast if you currently use one.
