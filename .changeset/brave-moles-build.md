---
"timvir": patch
---

Replace Rollup with Rolldown for bundling the package

`"use client"` directives are no longer hoisted to the entry modules (e.g. `timvir/core`), but stay on the individual files that declare them.
Applications using React Server Components now only include the client components they actually use in their client bundles, instead of entire Timvir modules.
