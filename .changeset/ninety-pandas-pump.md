---
"@timvir/mdx": patch
---

Switch to "default" export condition

The "import" export condition does not allow the module to be loaded with `require()`.
Nor does it allow Node.js to resolve the path to it via `require.resolve()`.
This made it impossible to load the remark plugin via `remarkPlugins: ["@timvir/mdx/remark"]`.
