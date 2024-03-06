import * as ReactDOM from "react-dom";
import {
  forwardRef,
  Fragment,
  ForwardedRef,
  ReactNode,
  useState,
  useEffect,
  cloneElement,
  isValidElement,
} from "react";
import { useForkRef } from "rooks";

import { setRef } from "./utils";

type PortalProps = {
  children?: ReactNode;
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: Element | (() => Element | null) | null;
  // @default false
  disablePortal?: boolean;
};

function getContainer(container: PortalProps["container"]) {
  return typeof container === "function" ? container() : container;
}

const Portal = forwardRef(function Portal(
  props: PortalProps,
  forwardedRef: ForwardedRef<Element>
) {
  const { children, container, disablePortal = false } = props;
  const [mountNode, setMountNode] =
    useState<ReturnType<typeof getContainer>>(null);

  const handleRef = useForkRef(
    // @ts-expect-error
    isValidElement(children) ? children.ref : null,
    forwardedRef
  );

  useEffect(() => {
    if (!disablePortal) {
      setMountNode(getContainer(container) || document.body);
    }
  }, [disablePortal]);

  useEffect(() => {
    if (mountNode && !disablePortal) {
      setRef(forwardedRef, mountNode);
      return () => {
        setRef(forwardedRef, null);
      };
    }

    return undefined;
  }, [forwardedRef, mountNode, disablePortal]);

  if (disablePortal) {
    if (isValidElement(children)) {
      const newProps = {
        ref: handleRef,
      };
      return cloneElement(children, newProps);
    }
    return <Fragment>{children}</Fragment>;
  }

  return (
    <Fragment>
      {mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode}
    </Fragment>
  );
});

export default Portal;
