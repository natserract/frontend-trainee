import I18nProvider from "./locale/i18nProvider";
import { Provider as LanguagesProvider} from './locale/context'
import InnerApp from "./inner-app";

function LocalizationPlayground() {
    return (
        <LanguagesProvider>
            <I18nProvider>
                <InnerApp />
            </I18nProvider>
        </LanguagesProvider>
    )
}

export default LocalizationPlayground