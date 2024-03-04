## Batch Your React Updates

> Batching is when React groups multiple state updates into a single re-render for better performance.

React doesn't automatically batch updates that you trigger in:
- Native DOM event listeners (e.g., el.addEventListener())
- Async callbacks (e.g., promises, timeouts, intervals)

Consider the following code:
```ts
fetchProfile(userId)
  .then(({name, age}) => {
    setName(name);
    setAge(age);
  });
```

In the above example, React will re-render your UI tree **twice**!

In earlier React versions (17 and earlier) there was batching only in browser event (like click), and it wasn't available. To make it available you had to use `unstable_batchedUpdates` to enforce batching

```ts
import {unstable_batchedUpdates} from 'react-dom';

const batchUpdate = unstable_batchedUpdates(() => {
    setName('Moustafa');
    setAge(25);
});

batchUpdate() //this will group all state changes inside and apply it in one re-render 
```

## Good News
if you're using **React 18** and above, you do not need it anymore because React 18 now support automatic batching.

This means that updates inside of timeouts, promises, native event handlers or any other event will batch the same way as updates inside of React events

## Additional reading
- https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/