import linaria from "@linaria/rollup";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import shebang from "rollup-plugin-add-shebang";
import css from "rollup-plugin-css-only";
import preserveDirectives from "rollup-preserve-directives";

import * as fs from "fs";
import stylis from "stylis";

import builtinModules from "builtin-modules";

stylis.set({ prefix: false });

function externalFor(pkg) {
  const packageJson = JSON.parse(fs.readFileSync(`pkg/${pkg}/package.json`, "utf8"));

  return [...Object.keys(packageJson.dependencies || {}), ...Object.keys(packageJson.peerDependencies || {})];
}

const extensions = [".js", ".jsx", ".ts", ".tsx"];

/*
 * The node version which we officially support in the NPM packages.
 */
const node = "18";

function block(name) {
  return [
    {
      input: `pkg/timvir/blocks/${name}/index.ts`,
      output: [
        {
          file: `pkg/timvir/blocks/${name}/index.js`,
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
          plugins: [["babel-plugin-macros"]],
          babelHelpers: "bundled",
        }),
        preserveDirectives(),
      ],
      external: [...externalFor("timvir"), /^timvir\//],
    },
  ];
}

function module(name) {
  return {
    input: `pkg/timvir/${name}/index.ts`,
    output: {
      file: `pkg/timvir/${name}/index.js`,
      format: "esm",
    },
    plugins: [
      resolve({ extensions }),
      commonjs(),
      linaria(),
      css({ output: "styles.css" }),
      babel({
        configFile: false,
        extensions,
        presets: [
          ["@babel/preset-typescript"],
          ["@babel/preset-env", { targets: { node } }],
          ["@babel/preset-react", { useSpread: true }],
        ],
        babelHelpers: "bundled",
      }),
      shebang(),
      preserveDirectives(),
    ],
    external: [...builtinModules, ...externalFor("timvir"), /^timvir\//],
  };
}

export default [
  /*
   * timvir
   */
  module("bus"),
  module("context"),
  module("core"),
  module("hooks"),
  module("search"),

  /*
   * timvir/blocks/*
   */
  ...fs.readdirSync("pkg/timvir/blocks").flatMap((file) => {
    if (file.match(/^[A-Z]/)) {
      return block(file);
    } else {
      return [];
    }
  }),
  {
    input: "pkg/timvir/blocks/index.ts",
    output: [
      {
        file: "pkg/timvir/blocks/index.js",
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
        plugins: [["babel-plugin-macros"]],
        babelHelpers: "bundled",
      }),
    ],
    external: [...builtinModules, ...externalFor("timvir"), /^timvir\//],
  },

  /*
   * timvir/core/theme/detector.js
   */
  {
    input: "pkg/timvir/core/theme/detector.ts",
    output: [
      {
        file: "pkg/timvir/core/theme/detector.js",
        format: "esm",
      },
    ],
    plugins: [
      terser(),
      babel({
        configFile: false,
        extensions,
        presets: [["@babel/preset-typescript"], ["@babel/preset-react", { useSpread: true }]],
        plugins: [["babel-plugin-macros"]],
        babelHelpers: "bundled",
      }),
    ],
  },

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
        babelHelpers: "bundled",
      }),
      shebang(),
    ],
    external: [...builtinModules, ...externalFor("cli")],
  },
];
