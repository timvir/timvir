# timvir

## 0.2.37

### Patch Changes

- **Add explicit type annotations to timvir/builtins** ([#3165](https://github.com/timvir/timvir/pull/3165)) - Previously we would leak the fact that Timvir internally is using Linaria for styling. To the user of this library, the components in timvir/builtins should appear just like any other React components.
- **Hide Linaria from the public facing API** ([#3166](https://github.com/timvir/timvir/pull/3166)) - With this change, we no longer leak Linaria types through the public facing Timvir API. Linaria still remains in use internally. But this fact is no longer exposed to users of Timvir.
- **Remove immer and use-immer dependencies** ([#3187](https://github.com/timvir/timvir/pull/3187)) - These dependencies did not bring enough value to the library to warrant their presence. This is a purely internal change and does not have any effect on the public API.
- **Remove fuzzaldrin-plus dependency** ([#3188](https://github.com/timvir/timvir/pull/3188)) - This change may affect the accuracy of search results (if you were relying on the fuzzy-search aspect of fuzzaldrin-plus). It also slightly degrades how the 'Search' component displays search results by no longer highlighting the string match.

## 0.2.36

## 0.2.35

### Patch Changes

- 3289108: Relax Link type

  The `Link` prop on `timvir/core` `<Page>` used to heavily lean on the type used by Next.js.
  In particular, it claimed to support `passHref` and `legacyBehavior` props.
  This is no longer the case.
  The `Link` can now be a plain HTMLAnchorElement (ie. `<a>`), or any component which implements a compatible inteface.
