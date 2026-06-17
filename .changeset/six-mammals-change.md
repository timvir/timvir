---
"timvir": patch
---

Set color and background-color in Page component

This fixes an issue where the main content area inherits these colors from the :root element.
Even though we set color on body, third-party components may override these values and so break the page styling.
