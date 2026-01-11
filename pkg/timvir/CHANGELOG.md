# timvir

## 0.2.47

### Patch Changes

- **Honor prefers-color-scheme media feature** ([#3635](https://github.com/timvir/timvir/pull/3635)) - Timvir now honors the prefers-color-scheme media feature. Previously, Timvir would only appear in light mode, unless the theme detector script was injected into the page. For cases where you have a component in an Exhibit that requires a light or dark background, you can override that globally (Page blocks configuration) or locally (theme prop on Exhibit). The theme detector module remains present to not break builds, but became obsolete. It will print a warning into the console when used. We will completely remove it in a future version.

## 0.2.46

## 0.2.45

### Patch Changes

- **Use data attributes instead of CSS classes to identify block elements** ([#3511](https://github.com/timvir/timvir/pull/3511)) - Previously we've added well-known class names to certain blocks. This was used to allow external tools to more easily identify blocks on a rendered page. The custom CSS classes have been replaced by data attributes. If you used class selectors to identify blocks, you'll need to replace them with data attribute selectors. For example, instead of `.timvir-b-Exhibit` use `[data-timvir-b-exhibit]`. Note: data attributes are lowercase.

## 0.2.44

### Patch Changes

- **Fix Viewport caption placement** ([#3484](https://github.com/timvir/timvir/pull/3484)) - During the migration to StyleX the layout of the Viewport caption got broken. Now the caption is once again in its correct place.
- **Trim dependencies** ([#3497](https://github.com/timvir/timvir/pull/3497)) - Removed `downshift` (because unused) and vendored the few icons from `react-feathers`. These dependencies are either unmaintained, contain legacy code, or make Timvir depend on such through their transitive dependencies. These changes improve the security posture of the Timvir package.

## 0.2.43

### Patch Changes

- **Avoid cyclic dependencies between Timvir modules** ([#3482](https://github.com/timvir/timvir/pull/3482)) - Cyclic dependencies were causing broken styles at best, and a crash at worst.

## 0.2.42

### Patch Changes

- **Fix broken release** ([#3473](https://github.com/timvir/timvir/pull/3473)) - No code changes.

## 0.2.41

### Patch Changes

- **Fix broken release** ([#3471](https://github.com/timvir/timvir/pull/3471)) - No code changes.

## 0.2.40

### Patch Changes

- **Remove peer dependency on @mdx-js/react** ([#3315](https://github.com/timvir/timvir/pull/3315)) - Timvir no longer wraps the page content with `<MDXProvider>`. Instead, Timvir provides a custom hook – `useArticleComponents` – for use in client components. If you're building server components though, you should prefer importing your custom components directly, and import Timvir builtins from the `timvir/builtins` module.
- **Improve word wrapping behavior in article pages** ([#3429](https://github.com/timvir/timvir/pull/3429)) - Long words (for example long identifiers used in certain programming languages) no longer extend beyond the layout box. Instead, the browser will break the words when needed. Note that this change only applies inside the article page content. In other parts of the interface (eg. sidebar or navigation footer) Timvir continues to use text truncation with ellipsis for long words.
- **Improve type of Page Link prop** ([#3330](https://github.com/timvir/timvir/pull/3330)) - The `Link` prop on the `<Page>` component is now type-compatible with the `<Link>` component from Next.js. This is not a breaking change, not at runtime anyways. There is a small chance that TypeScript will raise a type error. But it's more likely that you can remove a `as any` type cast if you currently use one.

## 0.2.39

### Patch Changes

- **Use the New JSX Transform** ([#3323](https://github.com/timvir/timvir/pull/3323)) - The New JSX Transform was released as part of React 17. This transform reduces bundle sizes and improves performance. For more details, see the announcement on the React blog: [Introducing the New JSX Transform](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html). As Timvir already requires React 17 or later, this should not have any impact to users.
- **Fix dark mode styles** ([#3197](https://github.com/timvir/timvir/pull/3197)) - During the recent Linaria v5 -> v6 (and corresponding stylis v3 -> v4) upgrade, the dark mode styles were slightly broken. This patch restores the dark mode styles.

## 0.2.38

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
