export default [
  { label: "Getting Started", path: "/docs" },
  { label: "Notes", path: "/docs/notes" },
  { label: "Theme", path: "/docs/theme" },
  {
    label: "Components",
    children: [
      { label: "Exhibit", path: "/docs/components/Exhibit" },
      {
        label: "Footer",
        path: "/docs/components/Footer",
        children: [
          { label: "API", path: "/docs/components/Footer/api" },
          { label: "Samples", path: "/docs/components/Footer/samples" }
        ]
      },
      { label: "Frobulator", path: "/docs/components/Frobulator" },
      { label: "Header", path: "/docs/components/Header" },
      { label: "Layout", path: "/docs/components/Layout" },
      { label: "Page", path: "/docs/components/Page" },
      { label: "Test", path: "/docs/components/Test" },
      { label: "TextField", path: "/docs/components/TextField" },
      { label: "Wrapper", path: "/docs/components/Wrapper" },
    ]
  },
  { label: "About", path: "/docs/about" }
] as const;
