import * as fs from "node:fs";
import stylexPlugin0 from "@stylexswc/rollup-plugin";
import { defineConfig } from "rolldown";

const stylexPlugin = stylexPlugin0.default;

const root = "pkg/timvir";

const packageJson = JSON.parse(fs.readFileSync(`${root}/package.json`, "utf8"));

/*
 * Dependencies and peer dependencies are not bundled. Neither are imports of
 * other timvir modules ('timvir/core', 'timvir/blocks/Code' etc.), these
 * are resolved through the 'exports' map at the consumer side.
 */
const external = [
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.peerDependencies || {}),
  "timvir",
];

/*
 * The modules listed in the 'exports' map in package.json.
 */
const input = [
  ...["blocks", "builtins", "bus", "context", "core", "hooks", "search"].map((name) => `${root}/${name}/index.ts`),
  ...fs
    .readdirSync(`${root}/blocks`)
    .filter((name) => name.match(/^[A-Z]/))
    .map((name) => `${root}/blocks/${name}/index.ts`),

  /*
   * Not exported, thus unreachable to users of this library. Kept so that the
   * file remains present in the published package, see CHANGELOG.
   */
  `${root}/core/theme/detector.ts`,
];

/*
 * The StyleX plugin emits the CSS rules it extracted from all modules into
 * 'styles.css'. Prepend 'global.css' to it.
 */
function styles() {
  return {
    name: "timvir:styles",
    generateBundle: {
      order: "post",
      handler(_options, bundle) {
        const asset = bundle["styles.css"];
        asset.source = `${fs.readFileSync(`${root}/global.css`, "utf8")}\n${asset.source}`;
      },
    },
  };
}

export default defineConfig({
  input,
  platform: "neutral",
  external: (id) => external.some((dep) => id === dep || id.startsWith(`${dep}/`)),
  transform: {
    /*
     * The node version which we officially support in the NPM packages.
     */
    target: "node18",

    /*
     * Make sure the published code uses the React PROD runtime ('jsx'), not
     * the DEV runtime ('jsxDEV').
     */
    jsx: { runtime: "automatic", development: false },
  },
  plugins: [
    stylexPlugin({
      useCSSLayers: true,
      fileName: "styles.css",
      rsOptions: {
        classNamePrefix: "timvir-s-",
      },
    }),
    styles(),
  ],
  onLog(level, log, handler) {
    /*
     * With 'preserveModules' each source file is emitted as its own module,
     * so the "use client" directives are preserved.
     */
    if (log.code === "MODULE_LEVEL_DIRECTIVE") {
      return;
    }

    handler(level, log);
  },
  output: {
    dir: root,
    format: "esm",
    preserveModules: true,
    preserveModulesRoot: root,

    /*
     * Modules from bundled dependencies (the StyleX runtime) would be emitted
     * into a 'node_modules' directory, which NPM excludes when packing. Emit
     * them into 'internal/vendor' instead, one copy shared by all modules.
     */
    entryFileNames: ({ name }) =>
      name.includes("node_modules/") ? `internal/vendor/${name.split("/").pop()}.js` : "[name].js",
  },
});
