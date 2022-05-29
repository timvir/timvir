## What is Timvir?

Timvir is a project documentation tool, currently optimized for React + Next.js projects (though nothing ties it inherently to Next.js). In its core, Timvir is a set of React
**components** and **conventions** which aim to make writing documentation easier.

Timvir grew out of our realization that we want the documentation to be part of the product (website, web app), not a separate artefact.
As such, Timvir is meant to be integrated into, and deployed as part of your product. For example, in a Next.js app it means putting the
documentation into `pages/docs/**/*.mdx`, and making it available under `https://example.com/docs`.

The `timvir/blocks` package provides standard components for documenting colors, typography, react components etc. This set of components
will be expanded in the future to cover the needs when documenting a project and its design system.

A second part of Timvir is a set of **conventions** how to write and document React components. It is not necessary to follow these conventions
when using Timvir, though they are used internally in the Timvir codebase and certain tooling around Timvir relies heavily on those.
These conventions are a living standard, subject to change as we discover ways how to refine them.

The third part of Timvir is a commandline tool (`@timvir/cli`) which aims to simplify certain workflows in a React project.

## Stage

The current focus is on:

- Integrate timvir into a few projects to find out whether the conventions makes sense.
- Improve the rough edges in the commandline tool, make common operations easy to execute.
- Expand the set of components based on the users needs when writing documentation pages.

## Prior art

 - **[Catalog](https://catalog.style)**: Based on plain Markdown, with custom blocks (called specimen).
 - **[Docup](https://docup.now.sh/)**: Similar to Catalog, based on Markdown, limited set of custom blocks.
 - **[Docz](https://www.docz.site/)**: Uses Gatsby + MDX, limited set of custom blocks.
