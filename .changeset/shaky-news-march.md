---
"@timvir/mdx": patch
---

Generate relative import paths in remark plugin

Turbopack (enabled by default in Next.js v16) does not support absolute import paths.
Not even if the files themselves are inside the workspace.
The remark plugin will now generate relative import paths.
