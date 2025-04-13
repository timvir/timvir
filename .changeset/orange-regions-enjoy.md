---
"timvir": patch
---

Hide Linaria from the public facing API

With this change, we no longer leak Linaria types through the public facing Timvir API.
Linaria still remains in use internally.
But this fact is no longer exposed to users of Timvir.
