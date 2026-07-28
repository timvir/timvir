export default {
  workspaces: {
    ".": {
      entry: [
        /*
         * Ad-hoc CLI entry points
         *
         * These are invoked directly (e.g. from GitHub Actions workflows)
         * rather than imported from other source files.
         */
        "config/rollup.config.js",
        "vst/playwright.config.ts",
        "vst/src/reporter.ts",

        /*
         * Samples
         *
         * Referenced dynamically by the <Sample component="..." variant="..." />
         * MDX convention, which pkg/mdx/remark.js rewrites into real imports
         * at MDX-compile time.
         */
        "src/**/samples/**/*.mdx",
      ],

      ignoreDependencies: [
        /*
         * Babel presets referenced by string name (not statically imported)
         * in config/rollup.config.js.
         */
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript",

        /*
         * Not used by the root workspace itself, but installed here because
         * all workspace dependencies are declared in the root package.json.
         * Actually used in pkg/mdx and pkg/timvir.
         */
        "bytestring",
        "mdast-util-from-markdown",
        "mdast-util-mdx",
        "shiki",
        "unist-util-visit",
      ],
    },

    "pkg/macro": {
      entry: ["index.{js,d.ts}"],
    },

    "pkg/mdx": {
      entry: ["index.{js,d.ts,test.js}", "remark.{js,d.ts}"],
    },

    "pkg/timvir": {
      entry: [
        /*
         * Exports
         *
         * These are the main entry points of the library. Keep this in sync with
         * the 'exports' field in package.json.
         */
        "blocks/index.ts",
        "blocks/*/index.ts",
        "builtins/index.ts",
        "bus/index.ts",
        "context/index.ts",
        "core/index.ts",
        "hooks/index.ts",
        "search/index.ts",

        /*
         * Generated files
         *
         * The library code may not use all the exports from these generated
         * files. Therefore these are also listed as entry points.
         */
        "core/theme/colors.ts",

        /*
         * Samples
         *
         * The sample files are only used for the documentation, not exported
         * by the library.
         */
        "blocks/*/samples/**/*.tsx",
        "core/components/*/samples/*.tsx",
        "search/*/samples/*.tsx",

        /*
         * FIXME: An entry point, but not exported (thus unreachable to users of
         * this library). Figure out if the theme detector is still needed and
         * expose properly, or delete.
         */
        "core/theme/detector.ts",

        /*
         * The index file references more than what's actually used in the timvir
         * modules. The referenced icons are bundled into the Timvir modules, any
         * additional exports do not contribute to the Timvir bundle size.
         */
        "icons/index.ts",
      ],
    },
  },
};
