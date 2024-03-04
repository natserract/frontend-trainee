import {i18n} from '@lingui/core'
import {useEffect} from "react";

import {AppLanguage} from "./languages";
import {sanitizeAppLanguageSetting} from "./helpers";
import {useLanguagePrefs} from "./context";

/**
 * We do a dynamic import of just the catalog that we need
 */
export async function dynamicActivate(locale: AppLanguage) {
    let mod: any

    switch (locale) {
        case AppLanguage.id: {
            mod = await import(`./locales/id/messages`)
            break
        }
        default: {
            mod = await import(`./locales/en/messages`)
            break
        }
    }

    i18n.load(locale, mod.messages)
    i18n.activate(locale)
}

export async function useLocaleLanguage() {
    const {appLanguage} = useLanguagePrefs()
    useEffect(() => {
        const sanitizedLanguage = sanitizeAppLanguageSetting(appLanguage)

        document.documentElement.lang = sanitizedLanguage
        dynamicActivate(sanitizedLanguage)
    }, [appLanguage])
}
