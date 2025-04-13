---
"timvir": patch
---

Add explicit type annotations to timvir/builtins

Previously we would leak the fact that Timvir internally is using Linaria for styling.
To the user of this library, the components in timvir/builtins should appear just like any other React components.
