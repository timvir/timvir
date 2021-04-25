import linaria from "@linaria/rollup";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import * as fs from "fs";
// import { terser } from "rollup-plugin-terser";
import shebang from "rollup-plugin-add-shebang";
import css from "rollup-plugin-css-only";
import stylis from "stylis";

stylis.set({ prefix: false });

const extensions = [".js", ".jsx", ".ts", ".tsx"];

/*
 * The node version which we officially support in the NPM packages.
 */
const node = "12";

function block(name) {
  return [
    {
      input: `pkg/blocks/${name}/index.ts`,
      output: [
        {
          file: `pkg/blocks/${name}/index.js`,
          format: "esm",
        },
      ],
      plugins: [
        resolve({ extensions }),
        commonjs({}),
        replace({ preventAssignment: true, "process.env.NODE_ENV": `"production"` }),
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
        ...Object.keys(require("../pkg/blocks/package.json").dependencies || {}),
        ...Object.keys(require("../pkg/blocks/package.json").peerDependencies || {}),
        /@timvir\/blocks/,
        /@timvir\/hooks/,
        /@timvir\/std/,
        /prism-react-renderer/,
      ],
    },
  ];
}

export default [
  /*
   * @timvir/cli
   */
  {
    input: "src/cli/index.ts",
    output: {
      file: "pkg/cli/bin.js",
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
        babelHelpers: "bundled",
      }),
      shebang(),
    ],
    external: [
      ...require("builtin-modules"),
      ...Object.keys(require("../pkg/cli/package.json").dependencies || {}),
      ...Object.keys(require("../pkg/cli/package.json").peerDependencies || {}),
    ],
  },

  /*
   * @timvir/std
   */
  {
    input: "pkg/std/base58/index.ts",
    output: [
      {
        file: "pkg/std/base58/index.js",
        format: "esm",
      },
    ],
    plugins: [
      resolve({ extensions }),
      replace({ preventAssignment: true, "process.env.NODE_ENV": `"production"` }),
      linaria(),
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
      ...Object.keys(require("../pkg/std/package.json").dependencies || {}),
      ...Object.keys(require("../pkg/std/package.json").peerDependencies || {}),
    ],
  },

  /*
   * @timvir/hooks
   */
  {
    input: "pkg/hooks/index.ts",
    output: [
      {
        file: "pkg/hooks/index.js",
        format: "esm",
      },
    ],
    plugins: [
      resolve({ extensions }),
      replace({ preventAssignment: true, "process.env.NODE_ENV": `"production"` }),
      linaria(),
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
      ...Object.keys(require("../pkg/hooks/package.json").dependencies || {}),
      ...Object.keys(require("../pkg/hooks/package.json").peerDependencies || {}),
    ],
  },

  /*
   * @timvir/core
   */
  {
    input: "pkg/core/index.ts",
    output: [
      {
        file: "pkg/core/index.js",
        format: "esm",
      },
    ],
    plugins: [
      resolve({ extensions }),
      replace({ preventAssignment: true, "process.env.NODE_ENV": `"production"` }),
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
      ...Object.keys(require("../pkg/core/package.json").dependencies || {}),
      ...Object.keys(require("../pkg/core/package.json").peerDependencies || {}),
      /@timvir\/core/,
    ],
  },

  /*
   * @timvir/blocks
   */
  ...fs.readdirSync("pkg/blocks").flatMap((file) => {
    if (file.match(/^[A-Z]/)) {
      return block(file);
    } else {
      return [];
    }
  }),
  {
    input: "pkg/blocks/index.ts",
    output: [
      {
        file: "pkg/blocks/index.js",
        format: "esm",
      },
    ],
    plugins: [
      resolve({ extensions }),
      commonjs({}),
      replace({ preventAssignment: true, "process.env.NODE_ENV": `"production"` }),
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
      ...Object.keys(require("../pkg/blocks/package.json").dependencies || {}),
      ...Object.keys(require("../pkg/blocks/package.json").peerDependencies || {}),
      /@timvir\/blocks/,
    ],
  },

  /*
   * @timvir/search
   */
  {
    input: "src/packages/search/index.ts",
    output: [
      {
        file: "pkg/search/index.js",
        format: "esm",
      },
    ],
    plugins: [
      resolve({ extensions }),
      // commonjs({}),
      replace({ preventAssignment: true, "process.env.NODE_ENV": `"production"` }),
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
      ...Object.keys(require("../pkg/search/package.json").dependencies || {}),
      ...Object.keys(require("../pkg/search/package.json").peerDependencies || {}),
      /@timvir\/search/,
    ],
  },
  {
    input: "pkg/search/index.js",
    output: [
      {
        file: "pkg/search/index.cjs",
        format: "cjs",
      },
    ],
    plugins: [
      resolve({ extensions }),
      babel({
        configFile: false,
        extensions,
        presets: [["@babel/preset-env", { targets: { node } }]],
        babelHelpers: "bundled",
      }),
    ],
    external: [
      "next/link",
      "next/router",
      ...Object.keys(require("../pkg/search/package.json").dependencies || {}),
      ...Object.keys(require("../pkg/search/package.json").peerDependencies || {}),
      /@timvir\/search/,
    ],
  },
];
