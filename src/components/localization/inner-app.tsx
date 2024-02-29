import {Trans} from '@lingui/macro'
import {useLingui} from '@lingui/react'
import {SelectLangBtn} from "./components/select-lang-btn";

function InnerApp() {
    const { i18n } = useLingui()

    return (
        <div>
            Current locale:: {i18n.locale}
            <p><Trans>Fried Chicken</Trans></p>

            <SelectLangBtn />
        </div>
    )
}

export default InnerApp