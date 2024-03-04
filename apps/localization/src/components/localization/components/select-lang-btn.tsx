import {useMemo, useCallback } from "react";

import {useLanguagePrefs, useLanguagePrefsApi} from "../locale/context";
import { sanitizeAppLanguageSetting } from "../locale/helpers";
import {APP_LANGUAGES} from "../locale/languages";

export function SelectLangBtn() {
    const langPrefs = useLanguagePrefs()
    const setLangPrefs = useLanguagePrefsApi()

    const onChangeAppLanguage = useCallback(
        (event: any) => {
            const value = event.target.value;

            if (!value) return
            if (langPrefs.appLanguage !== value) {
                setLangPrefs.setAppLanguage(sanitizeAppLanguageSetting(value))
            }
        },
        [langPrefs, setLangPrefs],
    )

    const items =  useMemo(() => {
        return APP_LANGUAGES.filter(l => Boolean(l.code2)).map(l => ({
            label: l.name,
            value: l.code2,
            key: l.code2,
        }))
    }, [])

    return (
        <select name='locales' onChange={onChangeAppLanguage}>
            {items.map(item => (
                <option key={item.key} value={item.value}>{item.label}</option>
            ))}
        </select>
    )
}