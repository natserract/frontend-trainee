import {createContext, PropsWithChildren, useContext, useState, useMemo } from "react";

import {AppLanguage} from "./languages";

type StateContext = {
    appLanguage: string;
}

type ApiContext = {
    setAppLanguage: (code2: AppLanguage) => void
}

const stateContext = createContext<StateContext>({
    appLanguage: 'en'
})

const apiContext = createContext<ApiContext>({
    setAppLanguage: (_: AppLanguage) => {},
})

export function Provider({ children }: PropsWithChildren) {
    const [state, setState] = useState<StateContext>({
        appLanguage: 'en'
    });

    const api = useMemo(() => ({
        setAppLanguage(code2: AppLanguage) {
            setState(s => ({...s, appLanguage: code2}))
        },
    }), [])

    return (
        <stateContext.Provider value={state}>
            <apiContext.Provider value={api}>{children}</apiContext.Provider>
        </stateContext.Provider>
    )
}

export function useLanguagePrefs() {
    return useContext(stateContext)
}

export function useLanguagePrefsApi() {
    return useContext(apiContext)
}