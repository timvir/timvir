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
        presets: [
          ["@babel/preset-typescript"],
          ["@babel/preset-env", { targets: { node: "12" } }],
          ["@babel/preset-react", { useSpread: true }]
        ],
        plugins: [["@babel/plugin-proposal-optional-chaining"], ["@babel/plugin-proposal-nullish-coalescing-operator"]]
      })
    ],
    external: [
      ...require("builtin-modules"),
      ...Object.keys(require("../packages/cli/package.json").dependencies || {}),
      ...Object.keys(require("../packages/cli/package.json").peerDependencies || {})
    ]
  },

  /*
   * @timvir/core
   */
  {
    input: "src/packages/core/index.ts",
    output: [
      {
        file: "packages/core/index.js",
        format: "cjs"
      }
    ],
    plugins: [
      resolve({ mainFields: "main", extensions }),
      commonjs({
        namedExports: {
          "linaria/react": ["styled"]
        }
      }),
      replace({ "process.env.NODE_ENV": `"production"` }),
      terser(),
      babel({
        configFile: false,
        extensions,
        presets: [["@babel/preset-typescript"], ["@babel/preset-react", { useSpread: true }]],
        plugins: [
          ["babel-plugin-macros"],
          ["@babel/plugin-proposal-optional-chaining"],
          ["@babel/plugin-proposal-nullish-coalescing-operator"]
        ]
      }),
      linaria(),
      css({ output: "packages/core/styles.css" })
    ],
    external: [
      "next/link",
      "next/router",
      ...Object.keys(require("../packages/core/package.json").dependencies || {}),
      ...Object.keys(require("../packages/core/package.json").peerDependencies || {})
    ]
  },

  /*
   * @timvir/blocks
   */
  {
    input: "src/packages/blocks/index.ts",
    output: [
      {
        file: "packages/blocks/index.js",
        format: "cjs"
      }
    ],
    plugins: [
      resolve({ mainFields: ["module", "main"], extensions }),
      commonjs({
        namedExports: {
          "node_modules/downshift/node_modules/react-is/index.js": ["isForwardRef"],
          "linaria/react": ["styled"],
          "node_modules/react-hotkeys/index.es.js": ["configure", "GlobalHotKeys"]
        }
      }),
      replace({ "process.env.NODE_ENV": `"production"` }),
      terser(),
      babel({
        configFile: false,
        extensions,
        presets: [["@babel/preset-typescript"], ["@babel/preset-react", { useSpread: true }]],
        plugins: [
          ["babel-plugin-macros"],
          ["@babel/plugin-proposal-optional-chaining"],
          ["@babel/plugin-proposal-nullish-coalescing-operator"]
        ]
      }),
      linaria(),
      css({ output: "packages/blocks/styles.css" })
    ],
    external: [
      "next/link",
      "next/router",
      ...Object.keys(require("../packages/blocks/package.json").dependencies || {}),
      ...Object.keys(require("../packages/blocks/package.json").peerDependencies || {})
    ]
  }
];
