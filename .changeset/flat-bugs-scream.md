---
"timvir": patch
---

Mark sub-path imports of dependencies as external

Due to a mistake in our Rollup config, we were inlining the `bytestring` package into our code.
The `bytestring` package is declared as dependency and should be kept external.
This change slightly decreases the bundle size of the `timvir/blocks/Arbitrary` module.
