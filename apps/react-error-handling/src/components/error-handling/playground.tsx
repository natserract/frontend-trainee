import { useEffect, useState } from "react";
import {
  ErrorBoundary,
  FallbackProps,
  useErrorBoundary,
  withErrorBoundary,
} from "react-error-boundary";

// Fallback
function fallbackRender({ error, resetErrorBoundary: _ }: FallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

// Example
function ErrorComponentDefaultExample() {
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const url = "https://natserract.com";
    fetch(url)
      .then()
      .catch((err) => {
        showBoundary(err);
      });
  }, []);

  return <div>Error component (Default)</div>;
}

const CatchErrorComponentDefault = () => (
  <ErrorBoundary fallbackRender={fallbackRender}>
    <ErrorComponentDefaultExample />
  </ErrorBoundary>
);

function ErrorComponentHOCExample() {
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const url = "https://natserract.com";
    fetch(url)
      .then()
      .catch((err) => {
        showBoundary(err);
      });
  }, []);

  return <div>Error component (By Hoc)</div>;
}

const CatchErrorComponentHOCExample = withErrorBoundary(
  ErrorComponentHOCExample,
  {
    fallbackRender,
    onError(error, info) {
      console.log(error, info);
      // Do something with the error
      // E.g. log to an error logging client here
    },
  },
);

// Error boundary catches only errors that happen during React lifecycle.
function ErrorComponentOutsideLifecycleExample() {
  const { showBoundary } = useErrorBoundary();

  // most of the errors in this component and in children will be caught by the ErrorBoundary
  const handleClick = () => {
    // The common recommendation here is to use regular try/catch for that kind of errors.
    // And at least here we can use state safely (more or less): callbacks of event handlers are exactly
    // the places where we usually set state anyway.
    try {
      // this error will be caught by catch
      throw new Error("Hulk smash!");
    } catch (e) {
      showBoundary(e);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Trigger Error!</button>
    </div>
  );
}

const CatchErrorComponentOutsideLifecycle = () => (
  <ErrorBoundary fallbackRender={fallbackRender}>
    <ErrorComponentOutsideLifecycleExample />
  </ErrorBoundary>
);

// Catching async errors with ErrorBoundary
// @see Dan Abramov hack https://github.com/facebook/react/issues/14981#issuecomment-468460187
function ErrorComponentOnSetStateExample() {
  const [_state, setState] = useState();
  const handleClick = () => {
    try {
      // something bad happened
      // this error will be caught by catch
      throw new Error("Hulk smash 2!");
    } catch (e) {
      // trigger state update, with updater function as an argument
      setState(() => {
        // re-throw this error within the updater function
        // it will be triggered during state update
        throw e;
      });
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Trigger Error!</button>
    </div>
  );
}

const CatchErrorComponentOnSetState = () => (
  <ErrorBoundary fallbackRender={fallbackRender}>
    <ErrorComponentOnSetStateExample />
  </ErrorBoundary>
);

export default function Playground() {
  return (
    <div>
      <CatchErrorComponentDefault />
      <CatchErrorComponentHOCExample />
      <CatchErrorComponentOutsideLifecycle />
      <CatchErrorComponentOnSetState />
    </div>
  );
}
