import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import babel from "rollup-plugin-babel";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default [
  {
    input: "src/cli/index.ts",
    output: {
      file: "packages/cli/index.js",
      format: "esm"
    },
    plugins: [
      resolve({ extensions }),
      commonjs(),
      terser(),
      babel({
        extensions,
        presets: ["@babel/preset-typescript"]
      })
    ],
    external: [
      ...require("builtin-modules"),
      ...Object.keys(require("../packages/cli/package.json").dependencies || {}),
      ...Object.keys(require("../packages/cli/package.json").peerDependencies || {})
    ]
  }
];
