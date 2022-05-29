export default [
  { label: "Home", path: "/" },
  { label: "Documentation", path: "/docs", children: [{ label: "Search", path: "/docs/search" }] },
  { label: "Commands", path: "/commands" },
  {
    label: "Modules",
    path: "/modules",
    children: [
      { label: "timvir/blocks", path: "/modules/blocks", children: [{ label: "Arbitrary", path: "/modules/blocks/Arbitrary" }] },
      { label: "timvir/core", path: "/modules/core" },
      { label: "@timvir/hooks", path: "/modules/hooks" },
      { label: "@timvir/std", path: "/modules/std", children: [{ label: "base58", path: "/modules/std/base58" }] },
    ],
  },
  {
    label: "Packages",
    children: [
      { label: "timvir", path: "/packages/timvir" },
      { label: "@timvir/cli", path: "/packages/cli" },
    ],
  },
  {
    label: "Blocks",
    children: [
      { label: "Arbitrary", path: "/blocks/Arbitrary" },
      { label: "Code", path: "/blocks/Code" },
      { label: "ColorBar", path: "/blocks/ColorBar" },
      { label: "ColorBook", path: "/blocks/ColorBook" },
      { label: "Cover", path: "/blocks/Cover" },
      { label: "Exhibit", path: "/blocks/Exhibit" },
      { label: "Font", path: "/blocks/Font" },
      { label: "Grid", path: "/blocks/Grid" },
      { label: "Icon", path: "/blocks/Icon" },
      { label: "Message", path: "/blocks/Message" },
      { label: "Swatch", path: "/blocks/Swatch" },
      { label: "Viewport", path: "/blocks/Viewport" },
      { label: "WebLink", path: "/blocks/WebLink" },
    ]
  },
  { label: "Concepts", children: [{ label: "Component Sample", path: "/concepts/component-sample" }] },
  { label: "Snippets", path: "/snippets" },
] as const;
