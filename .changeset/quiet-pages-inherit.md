---
"timvir": minor
---

Stop passing text styles down from `Page` and `body`

`Page` and the `body` rule in `styles.css` no longer set font family, font size, line height or font features.
Timvir components set these themselves, so components rendered inside a page, for example in an `<Exhibit>`, no longer inherit timvir's text styles.
To keep the previous look for your own content, set `font-family: system-ui, sans-serif`, `font-size: 0.9375rem` and `line-height: 1.7333` on `body` in your application.
