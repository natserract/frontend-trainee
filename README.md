# React Trainee

Practical Tasks:
- React - Higher Order Component ✅
- React - Context ✅
- Data Fetching: Async Await, parallelism, Abort Controller
  - https://medium.com/codex/resilient-fetch-requests-in-javascript-with-abortcontroller-a-guide-with-react-examples-573dba8a3758
- Redux RTQ

## Teory:
### React Lifecycle:
componentDidMount():  Setara dengan useEffect(() => {}, []). Larik ketergantungan kosong [] memastikan bahwa efek hanya berjalan sekali, setelah render awal.

componentDidUpdate(): Setara dengan useEffect(() => {}, [value]). Efek akan dipicu setiap kali nilai ketergantungan berubah.

componentWillUnmount(): Setara dengan useEffect(()) => { return () => {} }, []). Fungsi pembersihan yang dikembalikan oleh efek akan dipanggil saat komponen dilepas.

render(): Digantikan oleh JSX yang dikembalikan oleh komponen fungsional itu sendiri.

### CORS
CORS adalah singkatan dari Cross-Origin Resource Sharing. Ini adalah mekanisme yang memungkinkan browser web untuk membuat permintaan ke domain atau asal yang berbeda dari domain tempat halaman web tersebut awalnya ditayangkan.

### Asynchronous
References: https://dev.to/swarnaliroy94/methods-of-promise-all-any-finally-o2e
1. Promise.all(): 
    -> Multiple promises, with array `Promise.all([Promise1, Promise2])`
    -> Resolved: Ketika semua janji masukan telah diselesaikan atau masukan yang dapat diulang tidak mengandung janji, janji yang dikembalikan akan diselesaikan.
    -> Rejects: Segera menolak ketika sebuah input promise menolak atau non-promise melemparkan kesalahan dan akan menolak dengan pesan penolakan pertama / pesan kesalahan.
2. Promise.any(): 
    -> Multiple promises, with array `Promise.any([Promise1, Promise2])`
    -> Metode ini digunakan untuk mengembalikan janji pertama yang terpenuhi.
    -> Jika salah satu promise selesai, metode ini tidak akan menunggu janji lainnya selesai.
    -> Resolved as soon as possible

### Optimize web performance
- Minifying css, js file
- Browser caching, header:
  - Set di header network 
  ```ts
   // Instructing the Vercel edge to cache the file
  res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600') 
  ```
  - OR redis
- Compress image to webp
- Lazy load, Code Splitting: hanya load komponen yg dibutuhkan React.lazy,
- Use CDN
- Server Side Rendering/SSG:

### Cross Browser compatibility
- browserstack

### Redux concept
- Actions are objects that describe what happened in the application and carry a payload of information.
- Reducers are pure functions that determine how the state should change based on the dispatched action.
- Store is a single object that holds the entire application state and provides methods to access and update the state

Redux is a predictable state management library commonly used with JavaScript frameworks like React. It provides a way to manage the state of an application in a consistent and organized manner. The core idea behind Redux is to have a single source of truth for the entire application's state.

Here's a simple explanation of how Redux works:

1. **Store**: The application's state is stored in a single JavaScript object called the "store". The store holds the complete state tree of the application, including all the data needed by different parts of the application.

2. **Actions**: Actions are plain JavaScript objects that describe an event or an intention to change the state. They are dispatched to the store to initiate state changes. Actions must have a `type` property that indicates the type of action being performed.

3. **Reducers**: Reducers are pure functions responsible for handling state changes based on dispatched actions. They take the current state and an action as input, and they return a new state object. Reducers specify how the state should be updated in response to different types of actions.

4. **Dispatching Actions**: To update the state, actions are dispatched to the store using the `store.dispatch(action)` method. The store passes the dispatched action to the appropriate reducer(s), which then calculate the new state based on the current state and the action.

5. **Subscribing to the Store**: Components or other parts of the application can subscribe to the store to receive updates whenever the state changes. This is done using the `store.subscribe(listener)` method. The listener is a function that gets called whenever the state is updated, allowing the components to react to those changes.

6. **Selectors**: Selectors are functions that are used to extract specific pieces of data from the state. They provide a way to access the state in a structured manner and avoid direct access to the store. Selectors are commonly used in conjunction with libraries like `reselect` to efficiently compute derived data from the state.

By following this pattern, Redux provides several benefits:

- **Single Source of Truth**: The entire application's state is stored in a single object (the store), making it easier to manage and reason about the state.

- **Predictable State Updates**: The state updates in Redux are predictable and follow a strict pattern. Given the same initial state and set of actions, the reducers will always produce the same output, which makes debugging and testing easier.

- **Centralized State Management**: With Redux, the state is centralized and accessible from any part of the application. This eliminates the need for passing props or using complex communication between components.

- **Time Travel and Undo/Redo**: Redux allows developers to trace and replay actions, which enables powerful debugging capabilities. It also makes implementing undo/redo functionality easier by storing the entire history of actions.

Redux has become a popular choice for managing the state of complex applications because of its simplicity, scalability, and the ecosystem of tools and extensions built around it. However, it's worth noting that Redux may introduce additional complexity for smaller or simpler applications, and its usage should be evaluated based on the specific needs of the project.

### Development lifecycle
1. Requirement gathering
2. Planning
3. Design
4. Development
5. Testing
6. Deployment
7. Maintenance