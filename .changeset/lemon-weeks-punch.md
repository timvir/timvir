---
"timvir": patch
---

Trim dependencies

Removed `downshift` (because unused) and vendored the few icons from `react-feathers`.
These dependencies are either unmaintained, contain legacy code, or make Timvir depend on such through their transitive dependencies.
These changes improve the security posture of the Timvir package.
