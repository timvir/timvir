export default [
  { label: "Home", path: "/" },
  { label: "Commands", path: "/commands" },
  {
    label: "Components",
    children: [
      { label: "ColorBar", path: "/docs/components/ColorBar" },
      { label: "ColorBook", path: "/docs/components/ColorBook" },
      { label: "Exhibit", path: "/docs/components/Exhibit", children: [{ label: "Samples", children: [{ label: "Basic", path: "/docs/components/Exhibit/samples/basic" }] }] },
      { label: "Footer", path: "/docs/components/Footer" },
      { label: "Frobulator", path: "/docs/components/Frobulator" },
      { label: "Grid", path: "/docs/components/Grid" },
      { label: "Header", path: "/docs/components/Header" },
      { label: "Icon", path: "/docs/components/Icon" },
      { label: "Image", path: "/docs/components/Image" },
      { label: "Layout", path: "/docs/components/Layout" },
      { label: "Page", path: "/docs/components/Page" },
      { label: "SearchBox", path: "/docs/components/SearchBox" },
      { label: "SearchBoxInput", path: "/docs/components/SearchBoxInput" },
      { label: "SearchBoxListItem", path: "/docs/components/SearchBoxListItem" },
      { label: "Swatch", path: "/docs/components/Swatch" },
      { label: "Test", path: "/docs/components/Test" },
      { label: "TextField", path: "/docs/components/TextField" },
      { label: "Wrapper", path: "/docs/components/Wrapper" },
      { label: "X", path: "/docs/components/X" }
    ]
  }
] as const;
