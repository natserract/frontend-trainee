# Handle errors in React

## Catch errors in javascript

`try/catch` [statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch), which is more or less self-explanatory: try to do stuff, and if they fail - catch the mistake and do something to mitigate it:

```tsx
try {
  // if we're doing something wrong, this might throw an error
  await fetch("/bla-bla");
} catch (e) {
  // if error happened, catch it and do something with it without stopping the app
  // like sending this error to some logging service
}
```

## Simple try/catch in React

The most obvious and intuitive answer would be to render something while we wait for the fix. Luckily, we can do whatever we want in that catch statement, including setting the state.

```tsx
const SomeComponent = () => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      // do something like fetching some data
    } catch (e) {
      // oh no! the fetch failed, we have no data to render!
      setHasError(true);
    }
  });

  // something happened during fetch, lets render some nice error screen
  if (hasError) return <SomeErrorScreen />;

  // all's good, data is here, let's render it
  return <SomeComponentContent {...datasomething} />;
};
```

This approach is pretty straightforward and works great for simple, predictable, and narrow use cases like catching a failed fetch request.

But if you want to catch all errors that can happen in a component, you’ll face some challenges and serious limitations.

### Limitation 1: you will have trouble with useEffect hook.

If we wrap useEffect with try/catch, it just won’t work:

```tsx
try {
  useEffect(() => {
    throw new Error("Hulk smash!");
  }, []);
} catch (e) {
  // useEffect throws, but this will never be called
}
```

It’s happening because `useEffect` is called asynchronously after render, so from `try/catch` perspective everything went successfully. It’s the same story as with any [Promise](https://www.developerway.com/posts/fetching-in-react-lost-promises#part1): if we don’t wait for the result, then javascript will just continue with its business, return to it when the promise is done, and only execute what is inside useEffect (or then of a Promise). try/catch block will be executed and long gone by then.

In order for errors inside useEffect to be caught, try/catch should be placed inside as well:

```tsx
useEffect(() => {
  try {
    throw new Error("Hulk smash!");
  } catch (e) {
    // this one will be caught
  }
}, []);
```

### Limitation 2: children components.

`try/catch` won’t be able to catch anything that is happening inside children components. You can’t just do this:

```tsx
const Component = () => {
  let child;

  try {
    child = <Child />;
  } catch (e) {
    // useless for catching errors inside Child component, won't be triggered
  }

  return child;
};
```

### Limitation 3: setting state during render is a no-no

If you’re trying to catch errors outside of useEffect and various callbacks (i.e. during component’s render), then dealing with them properly is not that trivial anymore: state updates during render are not allowed.

Simple code like this, for example, will just cause an infinite loop of re-renders, if an error happens:

```tsx
const Component = () => {
  const [hasError, setHasError] = useState(false);

  try {
    doSomethingComplicated();
  } catch (e) {
    // don't do that! will cause infinite loop in case of an error
    // see codesandbox below with live example
    setHasError(true);
  }
};
```

## Solution: React ErrorBoundary component

To mitigate the limitations from above, React gives us what is known as [“Error Boundaries”](https://reactjs.org/docs/error-boundaries.html): a special API that turns a regular component into a `try/catch` statement in a way, only for React declarative code. Typical usage that you can see in every example over there, including React docs, will be something like this:

```tsx
const Component = () => {
  return (
    <ErrorBoundary>
      <SomeChildComponent />
      <AnotherChildComponent />
    </ErrorBoundary>
  );
};
```

## react-error-boundary instead

For those of you, who hate re-inventing the wheel or just prefer libraries for already solved problems, there is a nice one that implements a flexible ErrorBoundary component and has a few useful utils similar to those described above: [GitHub - bvaughn/react-error-boundary](https://github.com/bvaughn/react-error-boundary)

This documentation copied from https://www.developerway.com/posts/how-to-handle-errors-in-react#part6

## Additional Reading

- https://www.developerway.com/posts/how-to-handle-errors-in-react#part6
- https://github.com/facebook/react/issues/14981#issuecomment-468460187
