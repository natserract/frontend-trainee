/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
    locales: [
        'en',
        'id',
    ],
    "compileNamespace": "ts",
    catalogs: [
        {
            path: '<rootDir>/src/components/localization/locale/locales/{locale}/messages',
            include: ['src'],
        },
    ],
    format: 'po',
}
