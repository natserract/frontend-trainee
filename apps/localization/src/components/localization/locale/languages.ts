interface Language {
    code3: string
    code2: string
    name: string
}

export enum AppLanguage {
    en = 'en',
    id = 'id',
}

interface AppLanguageConfig {
    code2: AppLanguage
    name: string
}
export const APP_LANGUAGES: AppLanguageConfig[] = [
    {code2: AppLanguage.en, name: 'English'},
    {code2: AppLanguage.id, name: 'Bahasa Indonesia – Indonesian'},
]

export const LANGUAGES: Language[] = [
    {code3: 'eng', code2: 'en', name: 'English'},
    {code3: 'ind', code2: 'id', name: 'Indonesian'},
]

export const LANGUAGES_MAP_CODE2 = Object.fromEntries(
    LANGUAGES.map(lang => [lang.code2, lang]),
)

export const LANGUAGES_MAP_CODE3 = Object.fromEntries(
    LANGUAGES.map(lang => [lang.code3, lang]),
)
// some additional manual mappings (not clear if these should be in the "official" mappings)
if (LANGUAGES_MAP_CODE2.fa) {
    LANGUAGES_MAP_CODE3.pes = LANGUAGES_MAP_CODE2.fa
}
