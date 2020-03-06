export default [
  { label: "Home", path: "/" },
  { label: "Commands", path: "/commands" },
  {
    label: "Packages",
    children: [
      { label: "@timvir/cli", path: "/packages/cli" },
      { label: "@timvir/core", path: "/packages/core" },
      { label: "@timvir/blocks", path: "/packages/blocks" }
    ]
  },
  {
    label: "Components",
    children: [
      { label: "Code", path: "/docs/components/Code", children: [{ label: "API", path: "/docs/components/Code/api" }] },
      { label: "ColorBar", path: "/docs/components/ColorBar", children: [{ label: "API", path: "/docs/components/ColorBar/api" }] },
      { label: "ColorBook", path: "/docs/components/ColorBook" },
      { label: "Exhibit", path: "/docs/components/Exhibit", children: [{ label: "Samples", children: [{ label: "Basic", path: "/docs/components/Exhibit/samples/basic" }] }] },
      { label: "Grid", path: "/docs/components/Grid" },
      { label: "Icon", path: "/docs/components/Icon" },
      { label: "Image", path: "/docs/components/Image" },
      { label: "Page", path: "/docs/components/Page" },
      { label: "SearchBox", path: "/docs/components/SearchBox" },
      { label: "SearchBoxInput", path: "/docs/components/SearchBoxInput" },
      { label: "SearchBoxListItem", path: "/docs/components/SearchBoxListItem" },
      { label: "Swatch", path: "/docs/components/Swatch", children: [{ label: "API", path: "/docs/components/Swatch/api" }] }
    ]
  }
] as const;
