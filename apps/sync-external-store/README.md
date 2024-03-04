## Sync External Store
`useSyncExternalStore` is a React Hook that lets you subscribe to an external store. An external store is something that you can subscribe to, such as Redux store, Zustand store, global variables, module scope variables, DOM state, etc. It is different from internal stores, such as props, context, useState, useReducer, which are managed by React.

## When to use `useSyncExternalStore`
- Add useSyncExternalStore to help external store libraries integrate with React
- Another reason to add useSyncExternalStore is when you want to subscribe to some value exposed by the browser that changes over time.

## Additional reading
- https://react.dev/reference/react/useSyncExternalStore#subscribing-to-a-browser-api
- https://github.com/reactwg/react-18/discussions/86
- https://julesblom.com/writing/usesyncexternalstore