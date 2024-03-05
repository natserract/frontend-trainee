## Web Workers
> JavaScript VM is fundamentally designed to spawn a single thread, which means that it cannot read and execute multiple instructions simultaneously. Therefore, it must wait for the execution of a single instruction to be fully complete before moving on to the next one. This is also known as synchronous programming or blocking behavior.

Web workers are magical. Web workers provide a sort of escape hatch from the main thread by allowing developers to spin up separate threads to handle work off of the main thread. 

## Web Workers Benefit & Use Cases:
- Data encoding and decoding of a large string.
- Mathematical computations, such as finding all of the prime numbers in a large number.
- Background or data-intensive input and output operations.
- Using WASM(Web Assembly)

## Possible Problems That May Occur if Not Well Managed
- Bad user experience as a result of blocking operations.
- The web application becomes very slow and often freezes.

## Web Workers Limitation
Web workers have several limitations that you should be aware of:
- no access to the DOM: the Window object and the Document object
- they can only communicate back with the main JavaScript program using messaging
- they need to be loaded from the same origin (domain, port and protocol)
- they don’t work if you serve the page using the file protocol (file://), you need to serve them through HTTP(S) using a web server.

## Message Channel
A message channel allows sending messages between contexts, such as two **Workers**, by transferring the MessageChannel's MessagePorts to the workers. See also Window.postMessage and BroadcastChannel.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*V-NJhs2XadtHgR4Gip-TDA.jpeg)

A message channel is meant to establish a bidirectional communication between two consumers, we can see messageChannel instance has 2 ports and some methods that apparently seems helpful to build that. MessageChannel offers a few additional benefits:

- Efficient message passing: With MessageChannel, you can transfer ownership of a MessagePort object between contexts, which allows for more efficient message passing. By transferring ownership, you avoid making unnecessary copies of the data being sent. This can be particularly useful when dealing with large or complex data structures.

- Bidirectional communication: MessageChannel provides a bidirectional communication channel by creating two MessagePort objects. This allows for messages to be sent in both directions, enabling more interactive and collaborative communication between the different contexts. The built-in postMessage API only supports one-way communication from the worker to the main thread.

- Fine-grained control: MessageChannel gives you finer control over the communication process. You can set up event handlers on the MessagePort objects to handle messages, errors, or other events. This level of control allows for more sophisticated message handling and error management.

- Flexibility: MessageChannel allows you to establish communication channels between any two JavaScript execution contexts, not just between the main thread and web workers. You can use it to communicate between different web workers, iframes, or even between a web worker and a service worker.

## How to keep a worker thread process running when a page is refreshed?
To keep a worker thread process running when a page is refreshed, you'll need to persist the state of the worker and its associated data before the page is refreshed, and then restore that state after the page is reloaded. Here's a basic outline of how you can achieve this:

1. Save State Before Refresh:
   - When the page is about to be refreshed (e.g., in response to the beforeunload event), send a message to the worker to save its current state. 
   - The worker should handle this message by saving its state to some form of persistent storage, such as **IndexedDB** or **localStorage**.

2. Restore State After Refresh:
   - When the page is reloaded, create a new worker instance. 
   - When the new worker is initialized, send a message to it to request the previously saved state. 
   - The worker should handle this message by retrieving its saved state from storage and resuming its processing from where it left off.

## Additional Reading
- WASM with Web Worker in Rust https://github.com/code-jugglers/brain-games-rust/
- https://www.honeybadger.io/blog/javascript-web-workers-multithreading/
- Message channel https://javascript.plainenglish.io/message-channels-f94de3488b1a
- https://github.com/deebloo/things-you-can-do-in-a-web-worker
- https://trezy.com/blog/loading-images-with-web-workers
- Comlink https://davidea.st/articles/comlink-simple-web-worker/#workers-are-brilliant
