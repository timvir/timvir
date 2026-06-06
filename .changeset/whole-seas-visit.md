---
"@timvir/mdx": patch
---

Expose `@timvir/mdx/remark` as the module-name MDX remark plugin entrypoint.

This adds a default-exported subpath entrypoint so environments that resolve MDX plugins by module name (such as Turbopack config) can load the plugin directly.
If you configure MDX plugins using strings, use `@timvir/mdx/remark`.
Existing `remarkPlugin` imports from `@timvir/mdx` remain supported.
