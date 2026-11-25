---
"timvir": patch
---

Keep the navigation row of `Page` at its own height on narrow viewports

On narrow viewports, `Page` stacks the navigation above the content.
When the page was shorter than the viewport, the leftover height was split between both rows, which left a gap between the navigation and the content.
The content row now takes all the leftover height, so the content starts right below the navigation.
