import { ComponentType } from "react";

type HOCProps = NonNullable<unknown>

function withHigherOrderComponent<T extends HOCProps>(Component: ComponentType<T>) {
    // Closure
    return (props: Omit<T, keyof HOCProps>) => {
        return <Component {...(props as T)} />
    }
}

type InnerComponentProps = {
    title: string
}

function InnerComponent({ title }: InnerComponentProps) {
    return (
        <h1>{title}</h1>
    )
}

export function HigherOrderComponentPlayground() {
    const HigherOrderComponent = withHigherOrderComponent(InnerComponent);

    return (
        <div>
            <HigherOrderComponent title="Alfin" />
        </div>
    )
}