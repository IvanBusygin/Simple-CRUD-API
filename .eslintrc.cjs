module.exports = {
  root: true,
  env: {
    es2020: true,
    node: true
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: "."
  },
  plugins: [
    "@typescript-eslint",
    "prettier"
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 1,
  }
};
