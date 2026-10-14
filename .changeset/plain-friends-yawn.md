---
"timvir": patch
---

Settle Viewport if the iframe loads before React hydrates

Fix a bug in the `<Viewport>` block which would cause `timvir-unsettled` CSS class to never be removed.
This happened when its iframe finished loading before React hydrated, causing the `onLoad` event to be missed.
Possible symptoms were timeouts if your code is relying on the `timvir-unsettled` CSS class to disappear from the document.
