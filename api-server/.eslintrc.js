module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:prettier/recommended',
    'airbnb-base',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: [
    'prettier',
  ],
  rules: {
    'prettier/prettier': 0,
    'no-console': 'off',
    'no-unused-vars': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'no-underscore-dangle': 0,
    'no-shadow': 0,
    'object-shorthand': 0
  },
};
