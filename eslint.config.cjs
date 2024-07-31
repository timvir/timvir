module.exports = {
  plugins: {
    "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
    react: require("eslint-plugin-react"),
    "react-hooks": require("eslint-plugin-react-hooks"),
  },
  languageOptions: {
    parser: require("@typescript-eslint/parser"),
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  files: ["**/*.js", "**/*.ts", "**/*.tsx"],
  rules: {
    ...require("@typescript-eslint/eslint-plugin").configs.recommended.rules,
    ...require("eslint-plugin-react").configs.recommended.rules,

    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-empty-object-type": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-require-imports": 0,
    "@typescript-eslint/no-unused-vars": [1, { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],

    "react/no-children-prop": 0,
    "react/prop-types": 0,
    "react/no-unknown-property": ["error", { ignore: ["jsx", "global"] }],
  },
  ignores: [
    "eslint.config.cjs",
    ".linaria-cache/**/*",
    ".next/**/*",
    "node_modules/**",
    "config/rollup.config.js",
    "pkg/**/*.js",
  ],
};
