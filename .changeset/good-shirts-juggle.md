---
"timvir": patch
---

Remove peer dependency on @mdx-js/react

Timvir no longer wraps the page content with `<MDXProvider>`.
Instead, Timvir provides a custom hook – `useArticleComponents` – for use in client components.
If you're building server components though, you should prefer importing your custom components directly, and import Timvir builtins from the `timvir/builtins` module.
