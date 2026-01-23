---
"timvir": patch
"@timvir/macro": patch
"@timvir/mdx": patch
---

Drop dependency on Prettier

Prettier was used in the `@timvir/macro` and `@timvir/mdx` packages to format source code that's injected into MDX files.

When Prettier released major version 3, they dropped the synchrous API so we were not able to keep up to date.
Many projects are starting to adopt alternative formatters (oxc, biome).
Using Prettier introduces divergence between code in files and code that appears in the documentation.
Reformatting code makes line highlighting unpredictable.
Lines of code that the developer sees in source files may not correspond to lines in the documentation.

Due to those reasons, we're dropping dependency on Prettier.
Along with that, the macro and MDX plugin `<Sample>` component no longer supports `as="source/component"` or `as="source/markup"`.
If you rely on those features, inline the code into your MDX files.
