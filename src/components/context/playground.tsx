import {ChildConsumer} from "./child-consumer";
import {ComponentContextProvider} from "./init-context";

export function ContextPlayground() {
    return (
        <ComponentContextProvider>
            <h2>I'm a Parent</h2>
            <ChildConsumer />
        </ComponentContextProvider>
    )
}