import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import linaria from "@linaria/rollup";
import babel from "@rollup/plugin-babel";
import css from "rollup-plugin-css-only";
// import { terser } from "rollup-plugin-terser";
import shebang from "rollup-plugin-add-shebang";

import stylis from "stylis";
stylis.set({ prefix: false });

const extensions = [".js", ".jsx", ".ts", ".tsx"];

/*
 * The node version which we officially support in the NPM packages.
 */
const node = "12";

export default [
  /*
   * @timvir/cli
   */
  {
    input: "src/cli/index.ts",
    output: {
      file: "packages/cli/bin.js",
      format: "commonjs",
    },
    plugins: [
      resolve({ extensions }),
      commonjs(),
      // terser(),
      babel({
        configFile: false,
        extensions,
        presets: [
          ["@babel/preset-typescript"],
          ["@babel/preset-env", { targets: { node } }],
          ["@babel/preset-react", { useSpread: true }],
        ],
        plugins: [["@babel/plugin-proposal-optional-chaining"], ["@babel/plugin-proposal-nullish-coalescing-operator"]],
        babelHelpers: 'bundled'
      }),
      shebang(),
    ],
    external: [
      ...require("builtin-modules"),
      ...Object.keys(require("../packages/cli/package.json").dependencies || {}),
      ...Object.keys(require("../packages/cli/package.json").peerDependencies || {}),
    ],
  },

  /*
   * @timvir/core
   */
  {
    input: "src/packages/core/index.ts",
    output: [
      {
        file: "packages/core/index.js",
        format: "esm",
      },
    ],
    plugins: [
      resolve({ extensions }),
      // commonjs({}),
      replace({ "process.env.NODE_ENV": `"production"` }),
      linaria(),
      css({ output: "styles.css" }),
      babel({
        configFile: false,
        extensions,
        presets: [["@babel/preset-typescript"], ["@babel/preset-react", { useSpread: true }]],
        plugins: [
          ["babel-plugin-macros"],
          ["@babel/plugin-proposal-optional-chaining"],
          ["@babel/plugin-proposal-nullish-coalescing-operator"],
        ],
        babelHelpers: "bundled",
      }),
    ],
    external: [
      "next/link",
      "next/router",
      ...Object.keys(require("../packages/core/package.json").dependencies || {}),
      ...Object.keys(require("../packages/core/package.json").peerDependencies || {}),
    ],
  },
  {
    input: "packages/core/index.js",
    output: [
      {
        file: "packages/core/index.cjs",
        format: "cjs",
      },
    ],
    plugins: [
      resolve({ extensions }),
      babel({
        configFile: false,
        extensions,
        presets: [["@babel/preset-env", { targets: { node } }]],
        babelHelpers: 'bundled'
      }),
    ],
    external: [
      "next/link",
      "next/router",
      ...Object.keys(require("../packages/core/package.json").dependencies || {}),
      ...Object.keys(require("../packages/core/package.json").peerDependencies || {}),
    ],
  },

  /*
   * @timvir/blocks
   */
  {
    input: "src/packages/blocks/index.ts",
    output: [
      {
        file: "packages/blocks/index.js",
        format: "esm",
      },
    ],
    plugins: [
      resolve({ extensions }),
      commonjs({}),
      replace({ "process.env.NODE_ENV": `"production"` }),
      linaria(),
      css({ output: "styles.css" }),
      babel({
        configFile: false,
        extensions,
        presets: [["@babel/preset-typescript"], ["@babel/preset-react", { useSpread: true }]],
        plugins: [
          ["babel-plugin-macros"],
          ["@babel/plugin-proposal-optional-chaining"],
          ["@babel/plugin-proposal-nullish-coalescing-operator"],
        ],
        babelHelpers: 'bundled'
      }),
    ],
    external: [
      "next/link",
      "next/router",
      ...Object.keys(require("../packages/blocks/package.json").dependencies || {}),
      ...Object.keys(require("../packages/blocks/package.json").peerDependencies || {}),
    ],
  },
  {
    input: "packages/blocks/index.js",
    output: [
      {
        file: "packages/blocks/index.cjs",
        format: "cjs",
      },
    ],
    plugins: [
      resolve({ extensions }),
      babel({
        configFile: false,
        extensions,
        presets: [["@babel/preset-env", { targets: { node } }]],
        babelHelpers: 'bundled'
      }),
    ],
    external: [
      "next/link",
      "next/router",
      ...Object.keys(require("../packages/blocks/package.json").dependencies || {}),
      ...Object.keys(require("../packages/blocks/package.json").peerDependencies || {}),
    ],
  },

  /*
   * @timvir/search
   */
  {
    input: "src/packages/search/index.ts",
    output: [
      {
        file: "packages/search/index.js",
        format: "esm",
      },
    ],
    plugins: [
      resolve({ extensions }),
      // commonjs({}),
      replace({ "process.env.NODE_ENV": `"production"` }),
      linaria(),
      css({ output: "styles.css" }),
      babel({
        configFile: false,
        extensions,
        presets: [["@babel/preset-typescript"], ["@babel/preset-react", { useSpread: true }]],
        plugins: [
          ["babel-plugin-macros"],
          ["@babel/plugin-proposal-optional-chaining"],
          ["@babel/plugin-proposal-nullish-coalescing-operator"],
        ],
        babelHelpers: 'bundled'
      }),
    ],
    external: [
      "next/link",
      "next/router",
      ...Object.keys(require("../packages/search/package.json").dependencies || {}),
      ...Object.keys(require("../packages/search/package.json").peerDependencies || {}),
    ],
  },
  {
    input: "packages/search/index.js",
    output: [
      {
        file: "packages/search/index.cjs",
        format: "cjs",
      },
    ],
    plugins: [
      resolve({ extensions }),
      babel({
        configFile: false,
        extensions,
        presets: [["@babel/preset-env", { targets: { node } }]],
        babelHelpers: 'bundled'
      }),
    ],
    external: [
      "next/link",
      "next/router",
      ...Object.keys(require("../packages/search/package.json").dependencies || {}),
      ...Object.keys(require("../packages/search/package.json").peerDependencies || {}),
    ],
  },
];
