export default [
  { label: "Home", path: "/docs" },
  {
    label: "Components",
    children: [
      { label: "Exhibit", path: "/docs/components/Exhibit", children: [{ label: "Samples", children: [{ label: "Basic", path: "/docs/components/Exhibit/samples/basic" }] }] },
      { label: "Grid", path: "/docs/components/Grid" },
      { label: "Image", path: "/docs/components/Image" },
      { label: "Page", path: "/docs/components/Page" }
    ]
  }
] as const;
