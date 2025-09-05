---
"timvir": patch
---

Improve word wrapping behavior in article pages

Long words (for example long identifiers used in certain programming languages) no longer extend beyond the layout box.
Instead, the browser will break the words when needed.
Note that this change only applies inside the article page content.
In other parts of the interface (eg. sidebar or navigation footer) Timvir continues to use text truncation with ellipsis for long words.
