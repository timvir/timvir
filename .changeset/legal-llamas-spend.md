---
"timvir": patch
---

Use data attributes instead of CSS classes to identify block elements

Previously we've added well-known class names to certain blocks.
This was used to allow external tools to more easily identify blocks on a rendered page.
The custom CSS classes have been replaced by data attributes.
If you used class selectors to identify blocks, you'll need to replace them with data attribute selectors.
For example, instead of `.timvir-b-Exhibit` use `[data-timvir-b-exhibit]`.
Note: data attributes are lowercase.
