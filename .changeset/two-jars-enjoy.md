---
"timvir": patch
---

Explicitly set non-dev React runtime

Version 0.2.56 was published containing the React DEV runtime instead of PROD (ie. code uses `jsxDEV` instead of `jsx`).
Now we explicitly configure React runtime with `development: false` when bundling the package.
