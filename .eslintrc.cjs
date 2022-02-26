module.exports = {
  parser: "@typescript-eslint/parser",
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: ["plugin:@typescript-eslint/recommended", "plugin:react/recommended"],
  plugins: ["@typescript-eslint", "react-hooks"],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-unused-vars": [1, { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],

    "react/no-children-prop": 0,
    "react/prop-types": 0,
  },
};
