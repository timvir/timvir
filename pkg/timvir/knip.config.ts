export default {
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
  ],

  ignoreDependencies: ["@linaria/*", "next"],
};
