module.exports = {
  plugins: {
    "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
    react: require("eslint-plugin-react"),
  },
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-unused-vars": [1, { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],

    "react/no-children-prop": 0,
    "react/prop-types": 0,
    "react/no-unknown-property": ["error", { ignore: ["jsx", "global"] }],
  },
  ignores: [".linaria-cache", ".next", "node_modules", "config/rollup.config.js", "pkg/**/*.js"],
};
