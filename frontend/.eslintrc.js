module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    complexity: ["error", 60],
    "comma-dangle": 0,
    "@typescript-eslint/no-parameter-properties": 0,
    "react/prop-types": 0,
    "@typescript-eslint/no-require-imports": 0,
    "@typescript-eslint/indent": 0,
    "react/react-in-jsx-scope": 1,
    "no-mixed-spaces-and-tabs": 0,
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/allowEmptyCatch": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "react/jsx-max-props-per-line": [
      "error",
      {
        maximum: 5,
      },
    ],
  },
};
