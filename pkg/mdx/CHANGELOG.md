# @timvir/mdx

## 0.2.48

### Patch Changes

- **Drop dependency on Prettier** ([#3656](https://github.com/timvir/timvir/pull/3656)) - Prettier was used in the `@timvir/macro` and `@timvir/mdx` packages to format source code that's injected into MDX files. When Prettier released major version 3, they dropped the synchronous API so we were not able to keep up to date. Many projects are starting to adopt alternative formatters (oxc, biome). Using Prettier introduces divergence between code in files and code that appears in the documentation. Reformatting code makes line highlighting unpredictable. Lines of code that the developer sees in source files may not correspond to lines in the documentation. Due to those reasons, we're dropping dependency on Prettier. Along with that, the macro and MDX plugin `<Sample>` component no longer supports `as="source/component"` or `as="source/markup"`. If you rely on those features, inline the code into your MDX files.

## 0.2.47

## 0.2.46

### Patch Changes

- **Generate relative import paths in remark plugin** ([`2d332f9`](https://github.com/timvir/timvir/commit/2d332f9936e4827d0914829a65936f2dfec2486a)) - Turbopack (enabled by default in Next.js v16) does not support absolute import paths. Not even if the files themselves are inside the workspace. The remark plugin will now generate relative import paths.

## 0.2.45

## 0.2.44

## 0.2.43

## 0.2.42

## 0.2.41

## 0.2.40

## 0.2.39

## 0.2.38

## 0.2.37

## 0.2.36

## 0.2.35
