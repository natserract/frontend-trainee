const heavyTasks = () => {
  const elements = 5000000; // 5 million

  return Array(elements)
    .fill(elements)
    .map(() => Math.random());
};

addEventListener("message", (e: MessageEvent<MessageEventData>) => {
  // Handle computation task
  switch (e.data.action) {
    case "play":
      // Send message to main thread
      const bigArrays = heavyTasks();
      postMessage({
        status: "play_complete",
        payload: bigArrays,
      });
      break;
  }

  // Send message to channel
  const { port } = e.data;
  // Listen for messages on port 1 (Indo Worker - Sender)
  port.onmessage = (e: MessageEvent<MessageEventData>) => {
    console.log("Port 2 said", e.data);
  };

  // Send message to port 2
  port.postMessage("I'm indo worker!, Who are you?");
});
