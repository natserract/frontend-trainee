## Setup
Follow this guide: https://lingui.dev/tutorials/setup-react

- Setup [lingui.config.js](lingui.config.js)
- Add package json script
```shell
"intl:extract": "lingui extract",
"intl:compile": "lingui compile"
```
- Update eslint: ignore patterns, plugins [.eslintrc.cjs](.eslintrc.cjs)
- Create locales in [src/components/localization/locale/locales](src/components/localization/locale/locales)
- Run
```shell
(use "yarn intl:extract" to update catalogs with new messages)
(use "yarn intl:compile" to compile catalogs for production)
```

## Additional Reading
- https://lingui.dev/