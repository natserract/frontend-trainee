import {
  useState,
  useCallback,
  ComponentPropsWithRef,
  forwardRef,
  ForwardedRef,
} from "react";

type UsePolymorphicComponent<T extends keyof HTMLElementTagNameMap = "div"> = {
  as?: T;
};

export function usePolymorphicComponent<
  T extends keyof HTMLElementTagNameMap = "div"
>(
  parameters: UsePolymorphicComponent<T>
): [string, (instance: HTMLElement | null) => void] {
  const { as: rootElementNameProp = "div" } = parameters;

  const [rootElementName, setRootElementName] = useState<string>(
    rootElementNameProp.toUpperCase()
  );

  const updateRootElementName = useCallback((instance: HTMLElement | null) => {
    setRootElementName(instance?.tagName ?? "");
  }, []);

  return [rootElementName, updateRootElementName];
}

type PolymorphicComponentProps<T extends keyof HTMLElementTagNameMap = "div"> =
  UsePolymorphicComponent<T> & Partial<ComponentPropsWithRef<T>>;

function PolymorphicComponentRoot<
  T extends keyof HTMLElementTagNameMap = "div"
>(
  props: PolymorphicComponentProps<T>,
  ref: ForwardedRef<HTMLElement | undefined>
) {
  const { as: rootElementNameProp, ...componentProps } = props;

  const [RootComponent] = usePolymorphicComponent<T>({
    as: rootElementNameProp,
  });

  return <RootComponent ref={ref} {...componentProps} />;
}

export const PolymorphicComponent = forwardRef(PolymorphicComponentRoot);
