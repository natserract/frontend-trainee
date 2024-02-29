module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: [
      'dist',
    '.eslintrc.cjs',
    'src/components/localization/locale/locales/_build/',
    'src/components/localization/locale/locales/**/*.js',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'lingui'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-explicit-any": 0
  },
}
