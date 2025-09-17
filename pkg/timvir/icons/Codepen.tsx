import type { SVGProps } from "react";
const SvgCodepen = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}
  >
    <path d="m12 2 10 6.5v7L12 22 2 15.5v-7zM12 22v-6.5" />
    <path d="m22 8.5-10 7-10-7" />
    <path d="m2 15.5 10-7 10 7M12 2v6.5" />
  </svg>
);
export default SvgCodepen;
