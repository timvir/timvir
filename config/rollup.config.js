import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import linaria from "linaria/rollup";
import babel from "rollup-plugin-babel";
import css from "rollup-plugin-css-only";
import { terser } from "rollup-plugin-terser";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default [
  /*
   * @timvir/cli
   */
  {
    input: "src/cli/index.ts",
    output: {
      file: "packages/cli/index.js",
      format: "commonjs"
    },
    plugins: [
      resolve({ extensions }),
      commonjs(),
      terser(),
      babel({
        configFile: false,
        extensions,
        presets: [["@babel/preset-typescript"], ["@babel/preset-env", { targets: { node: "12" } }]]
      })
    ],
    external: [
      ...require("builtin-modules"),
      ...Object.keys(require("../packages/cli/package.json").dependencies || {}),
      ...Object.keys(require("../packages/cli/package.json").peerDependencies || {})
    ]
  },

  /*
   * @timvir/page
   */
  {
    input: "src/packages/page/index.ts",
    output: [
      {
        file: "packages/page/index.js",
        format: "cjs"
      }
    ],
    plugins: [
      resolve({ extensions }),
      commonjs(),
      replace({ "process.env.NODE_ENV": `"production"` }),
      terser(),
      babel({
        configFile: false,
        extensions,
        presets: [["@babel/preset-typescript"], ["@babel/preset-react", { useSpread: true }]],
        plugins: [["babel-plugin-macros"]]
      }),
      linaria(),
      css({ output: "packages/page/styles.css" })
    ],
    external: [
      "linaria/react",
      ...Object.keys(require("../packages/page/package.json").dependencies || {}),
      ...Object.keys(require("../packages/page/package.json").peerDependencies || {})
    ]
  }
];
