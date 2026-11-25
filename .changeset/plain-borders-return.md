---
"timvir": patch
---

Restore missing borders in `Page`, `Footer` and the command palette

The StyleX compiler silently dropped `border` shorthand properties, so the narrow-viewport menu button showed the browser's default button border, and the sidebar, footer and command palette lost their separator lines.
