// {
//   "root": true,
//   "env": { "browser": true, "es2020": true },
//   "plugins": ["react-refresh"],
//   "parser": "@typescript-eslint/parser",
//   "ignorePatterns": ["dist", ".eslintrc.json", "index.html", "public"],
//   "rules": {
//     "react-hooks/exhaustive-deps": "off",
//     "react-refresh/only-export-components": [
//       "warn",
//       { "allowConstantExport": true }
//     ]
//   },
//   "extends": [
//     "eslint:recommended",
//     "plugin:@typescript-eslint/recommended",
//     "plugin:react-hooks/recommended"
//   ]
// }

module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    react: {
      createClass: 'createReactClass', // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: 'React', // Pragma to use, default to "React"
      fragment: 'Fragment', // Fragment to use (may be a property of <pragma>), default to "Fragment"
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
      // You can also use 16.0, 16.3, etc, if you want to override the detected value.
      // default to latest and warns if missing
      // It will default to "detect" in the future
    },
  },
  plugins: ['react', 'jest', 'cypress', '@typescript-eslint', 'react-hooks'],
  rules: {
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'no-debugger': 'error',
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'none', ignoreRestSiblings: true },
    ],
    'no-return-await': 'error',
    'no-self-compare': 'error',
    'no-warning-comments': ['warn', { terms: ['todo', 'fixme'] }],
    'no-inline-comments': 'error',
    'no-new-object': 'error',
    'no-duplicate-imports': 'error',
    'no-throw-literal': 'error',
    'no-return-assign': ['error', 'always'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
};
