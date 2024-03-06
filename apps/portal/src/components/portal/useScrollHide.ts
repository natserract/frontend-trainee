import React from "react";

export const useScrollHide = <T extends HTMLElement>() => {
  const ref = React.useRef<T>(null);
  const initialStyle = React.useRef<
    Required<Pick<React.CSSProperties, "overflow">>
  >({
    overflow: `auto`,
  });

  React.useLayoutEffect(() => {
    const getElement = (): HTMLElement => ref.current ?? document.body;

    const show = (): void => {
      const element = getElement();
      const style = initialStyle.current;

      element.style.overflow = style.overflow;
    };

    const hide = (): void => {
      const element = getElement();
      initialStyle.current.overflow = element.style.overflow;

      element.style.overflow = `hidden`;
    };

    hide();

    return show;
  }, []);

  return [ref] as const;
};
