---
"timvir": patch
---

Honor prefers-color-scheme media feature

Timvir now honors the prefers-color-scheme media feature.
Previously, Timvir would only appear in light mode, unless the theme detector script was injected into the page.
For cases where you have a component in an Exhibit that requires a light or dark background, you can override that globally (Page blocks configuration) or locally (theme prop on Exhibit).

The theme detector module remains present to not break builds, but became obsolete.
It will print a warning into the console when used.
We will completely remove it in a future version.
