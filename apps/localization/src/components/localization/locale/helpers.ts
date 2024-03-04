import {
    AppLanguage,
    LANGUAGES_MAP_CODE2,
    LANGUAGES_MAP_CODE3,
} from './languages'

export function code2ToCode3(lang: string): string {
    if (lang.length === 2) {
        return LANGUAGES_MAP_CODE2[lang]?.code3 || lang
    }
    return lang
}

export function code3ToCode2(lang: string): string {
    if (lang.length === 3) {
        return LANGUAGES_MAP_CODE3[lang]?.code2 || lang
    }
    return lang
}

export function code3ToCode2Strict(lang: string): string | undefined {
    if (lang.length === 3) {
        return LANGUAGES_MAP_CODE3[lang]?.code2
    }

    return undefined
}

export function codeToLanguageName(lang: string): string {
    const lang2 = code3ToCode2(lang)
    return LANGUAGES_MAP_CODE2[lang2]?.name || lang
}

export function sanitizeAppLanguageSetting(appLanguage: string): AppLanguage {
    const langs = appLanguage.split(',').filter(Boolean)

    for (const lang of langs) {
        switch (lang) {
            case 'en':
                return AppLanguage.en
            case 'id':
                return AppLanguage.id
            default:
                continue
        }
    }
    return AppLanguage.en
}
