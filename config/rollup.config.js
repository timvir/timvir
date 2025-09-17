import * as fs from "node:fs";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import stylexPlugin0 from "@stylexswc/rollup-plugin";
import builtinModules from "builtin-modules";
import preserveDirectives from "rollup-preserve-directives";

const stylexPlugin = stylexPlugin0.default;

function externalFor(pkg) {
  const packageJson = JSON.parse(fs.readFileSync(`pkg/${pkg}/package.json`, "utf8"));

  return [
    "react/jsx-runtime",
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.peerDependencies || {}),
  ];
}

const extensions = [".js", ".jsx", ".ts", ".tsx"];

/*
 * The node version which we officially support in the NPM packages.
 */
const node = "18";

export default [
  {
    input: [
      "pkg/timvir/blocks/index.ts",
      ...fs.readdirSync("pkg/timvir/blocks").flatMap((dirent) => {
        if (dirent.match(/^[A-Z]/)) {
          return [`pkg/timvir/blocks/${dirent}/index.ts`];
        } else {
          return [];
        }
      }),
      "pkg/timvir/builtins/index.ts",
      "pkg/timvir/bus/index.ts",
      "pkg/timvir/context/index.ts",
      "pkg/timvir/core/index.ts",
      "pkg/timvir/hooks/index.ts",
      "pkg/timvir/search/index.ts",
    ],
    output: [
      {
        format: "esm",
        dir: "pkg/timvir",
        preserveModules: true,
        preserveModulesRoot: "pkg/timvir",
      },
    ],
    plugins: [
      resolve({ extensions }),
      commonjs({}),
      replace({ preventAssignment: true, "process.env.NODE_ENV": `"production"` }),
      stylexPlugin({
        useCSSLayers: true,
        fileName: "styles.css",
        rsOptions: {
          classNamePrefix: "timvir-s-",
        },
      }),
      babel({
        configFile: false,
        extensions,
        presets: [
          ["@babel/preset-typescript"],
          ["@babel/preset-env", { targets: { node } }],
          ["@babel/preset-react", { runtime: "automatic", useSpread: true }],
        ],
        babelHelpers: "bundled",
      }),
      preserveDirectives(),
    ],
    external: [...builtinModules, ...externalFor("timvir"), /^bytestring\//, /^timvir\//],
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
        presets: [["@babel/preset-typescript"], ["@babel/preset-react", { runtime: "automatic", useSpread: true }]],
        babelHelpers: "bundled",
      }),
    ],
  },
];
