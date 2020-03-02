export default [
  { label: "Home", path: "/" },
  { label: "Commands", path: "/commands" },
  {
    label: "Components",
    children: [
      { label: "Code", path: "/docs/components/Code" },
      { label: "ColorBar", path: "/docs/components/ColorBar" },
      { label: "ColorBook", path: "/docs/components/ColorBook" },
      { label: "Exhibit", path: "/docs/components/Exhibit", children: [{ label: "Samples", children: [{ label: "Basic", path: "/docs/components/Exhibit/samples/basic" }] }] },
      { label: "Grid", path: "/docs/components/Grid" },
      { label: "Icon", path: "/docs/components/Icon" },
      { label: "Image", path: "/docs/components/Image" },
      { label: "Page", path: "/docs/components/Page" },
      { label: "SearchBox", path: "/docs/components/SearchBox" },
      { label: "SearchBoxInput", path: "/docs/components/SearchBoxInput" },
      { label: "SearchBoxListItem", path: "/docs/components/SearchBoxListItem" },
      { label: "Swatch", path: "/docs/components/Swatch" }
    ]
  }
] as const;
