import * as Icons from "react-feather";

export default [
  { label: "Home", path: "/" },
  {
    label: "Documentation",
    path: "/docs",
    children: [{ label: "Search", path: "/docs/search", icon: <Icons.Search /> }],
  },
  { label: "Commands", path: "/commands" },
  {
    label: "Packages",
    children: [
      { label: "timvir", path: "/packages/timvir", icon: <Icons.HardDrive /> },
      { label: "@timvir/cli", path: "/packages/cli", icon: <Icons.HardDrive /> },
    ],
  },
  {
    label: "Modules",
    children: [
      {
        label: "timvir/blocks",
        path: "/modules/blocks",
        icon: <Icons.Box />,
        children: [{ label: "Arbitrary", path: "/modules/blocks/Arbitrary", icon: <Icons.Box /> }],
      },
      { label: "timvir/core", path: "/modules/core", icon: <Icons.Box /> },
      { label: "@timvir/hooks", path: "/modules/hooks", icon: <Icons.Box /> },
      {
        label: "@timvir/std",
        path: "/modules/std",
        icon: <Icons.Box />,
        children: [{ label: "base58", path: "/modules/std/base58", icon: <Icons.Box /> }],
      },
    ],
  },
  {
    label: "Blocks",
    children: [
      { label: "Arbitrary", path: "/blocks/Arbitrary", icon: <Icons.Codepen /> },
      { label: "Code", path: "/blocks/Code", icon: <Icons.Codepen /> },
      { label: "ColorBar", path: "/blocks/ColorBar", icon: <Icons.Codepen /> },
      { label: "ColorBook", path: "/blocks/ColorBook", icon: <Icons.Codepen /> },
      { label: "Cover", path: "/blocks/Cover", icon: <Icons.Codepen /> },
      { label: "Exhibit", path: "/blocks/Exhibit", icon: <Icons.Codepen /> },
      { label: "Font", path: "/blocks/Font", icon: <Icons.Codepen /> },
      { label: "Grid", path: "/blocks/Grid", icon: <Icons.Codepen /> },
      { label: "Icon", path: "/blocks/Icon", icon: <Icons.Codepen /> },
      { label: "Message", path: "/blocks/Message", icon: <Icons.Codepen /> },
      { label: "Swatch", path: "/blocks/Swatch", icon: <Icons.Codepen /> },
      { label: "Viewport", path: "/blocks/Viewport", icon: <Icons.Codepen /> },
      { label: "WebLink", path: "/blocks/WebLink", icon: <Icons.Codepen /> },
    ],
  },
  {
    label: "Concepts",
    children: [{ label: "Component Sample", path: "/concepts/component-sample", icon: <Icons.AlignLeft /> }],
  },
  { label: "Snippets", path: "/snippets" },
] as const;
