export default [
  { label: "Home", path: "/" },
  { label: "Documentation", path: "/docs", children: [{ label: "Search", path: "/docs/search" }] },
  { label: "Commands", path: "/commands" },
  {
    label: "Packages",
    children: [
      { label: "@timvir/blocks", path: "/packages/blocks" },
      { label: "@timvir/cli", path: "/packages/cli" },
      { label: "@timvir/core", path: "/packages/core" },
      { label: "@timvir/macro", path: "/packages/macro" },
      { label: "@timvir/search", path: "/packages/search" },
    ],
  },
  {
    label: "Components",
    children: [
      { label: "Arbitrary", path: "/docs/components/Arbitrary" },
      { label: "Card", path: "/docs/components/Card" },
      { label: "Code", path: "/docs/components/Code", children: [{ label: "API", path: "/docs/components/Code/api" }] },
      { label: "ColorBar", path: "/docs/components/ColorBar", children: [{ label: "API", path: "/docs/components/ColorBar/api" }] },
      { label: "ColorBook", path: "/docs/components/ColorBook" },
      { label: "ColorContrastInspector", path: "/docs/components/ColorContrastInspector" },
      { label: "Cover", path: "/docs/components/Cover", children: [{ label: "API", path: "/docs/components/Cover/api" }] },
      { label: "Exhibit", path: "/docs/components/Exhibit", children: [{ label: "Samples" }] },
      { label: "Exhibits", path: "/docs/components/Exhibits" },
      { label: "Figma", path: "/docs/components/Figma" },
      { label: "Font", path: "/docs/components/Font" },
      { label: "FontFamilyMatrix", path: "/docs/components/FontFamilyMatrix" },
      { label: "Footer", path: "/docs/components/Footer" },
      { label: "Grid", path: "/docs/components/Grid" },
      { label: "Icon", path: "/docs/components/Icon" },
      { label: "Image", path: "/docs/components/Image" },
      { label: "Live", path: "/docs/components/Live" },
      { label: "Message", path: "/docs/components/Message", children: [{ label: "API", path: "/docs/components/Message/api" }] },
      { label: "NavigationFooter", path: "/docs/components/NavigationFooter" },
      { label: "Page", path: "/docs/components/Page" },
      { label: "Search", path: "/docs/components/Search" },
      { label: "SearchBoxInput", path: "/docs/components/SearchBoxInput" },
      { label: "SearchBoxListItem", path: "/docs/components/SearchBoxListItem" },
      { label: "Swatch", path: "/docs/components/Swatch", children: [{ label: "API", path: "/docs/components/Swatch/api" }] },
      { label: "Viewport", path: "/docs/components/Viewport" },
      { label: "WebLink", path: "/docs/components/WebLink" },
    ],
  },
  { label: "Concepts", children: [{ label: "Component Sample", path: "/concepts/component-sample" }] },
  { label: "Snippets", path: "/snippets" },
] as const;
