## React Portal
Portal allows rendering a component at a different place in the parent tree. You can use it to render content which should appear above other elements, similar to Modal. They’re available to solve the common problem of rendering components that cannot or should not be nested under their parents.

## Benefits of portals

One of the nice things about portals is the consistency provided by their abstraction. Although your component will be rendered differently under the hood, the developer experience remains the same.

Portal-rendered components will behave the same as normal components in all other regards, meaning that they can still access data from Contexts, and Events will still bubble up to their component ancestors even if they’re not DOM ancestors.

When using portals, there are still a few things you need to be aware of, as it’s possible to make some mistakes that could lead to a degraded user experience.

Overall, React portals provide a powerful mechanism for rendering components outside the normal DOM hierarchy, promoting modularity, enabling flexible styling and positioning, and facilitating the creation of overlay components with proper event handling.

## Additional Reading
- https://handsontable.com/blog/guide-to-react-portals-what-are-they
- https://4markdown.com/modal-in-react-and-tailwind/