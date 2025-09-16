import * as Icons from "react-feather";

export default [
  { label: "Home", path: "/" },
  {
    label: "Getting Started",
    path: "/getting-started",
    children: [{ label: "Next.js", path: "/getting-started/nextjs" }],
  },
  {
    label: "Blocks",
    path: "/blocks",
    children: [
      { label: "Arbitrary", path: "/blocks/Arbitrary", icon: <Icons.Codepen /> },
      { label: "Code", path: "/blocks/Code", icon: <Icons.Codepen /> },
      { label: "ColorBar", path: "/blocks/ColorBar", icon: <Icons.Codepen /> },
      { label: "Exhibit", path: "/blocks/Exhibit", icon: <Icons.Codepen /> },
      { label: "Message", path: "/blocks/Message", icon: <Icons.Codepen /> },
      { label: "Swatch", path: "/blocks/Swatch", icon: <Icons.Codepen /> },
      { label: "Viewport", path: "/blocks/Viewport", icon: <Icons.Codepen /> },
      { label: "WebLink", path: "/blocks/WebLink", icon: <Icons.Codepen /> },
    ],
  },
] as const;
