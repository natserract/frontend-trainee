import {createContext, useState, PropsWithChildren, useContext} from 'react'

interface IComponentValue {
    title: string;
}

export interface IComponentContext {
    data: IComponentValue;
    updateData: (value: IComponentValue) => void;
}

export const ComponentContext = createContext<IComponentContext>({
    data: {
        title: ""
    },
    updateData: () => null,
});

export function ComponentContextProvider(props: PropsWithChildren) {
    const [state, setState] = useState<IComponentValue>({
        title: ''
    });

    const updateData = (value: IComponentValue) => {
        setState(value)
    }

    return (
        <ComponentContext.Provider value={{
            data: state,
            updateData
        }}>
            {props.children}
        </ComponentContext.Provider>
    )
}

export function useComponentContext() {
    const context = useContext(ComponentContext);
    if (context === undefined) {
        throw new Error('Context must be used within Provider')
    }

    return context;
}