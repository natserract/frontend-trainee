addEventListener("message", (e) => {
  const { port } = e.data;

  // Listen for messages on port 2 (Chinese Worker - Receiver)
  port.onmessage = (e: MessageEvent<MessageEventData>) => {
    console.log("Port 1 said", e.data);
  };

  // Send message to port 1
  port.postMessage("Holla! I'm chinese worker!");
});
