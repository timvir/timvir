---
"timvir": patch
---

Avoid cyclic dependencies between Timvir modules

Cyclic dependencies were causing broken styles at best, and a crash at worst.
