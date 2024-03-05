import { Action } from "../actions";
import { channel, indoWorker, chineseWorker } from "./main";

function WebWorkerNativePlayground() {
  const handleStartWorker = async () => {
    // Make sure Worker is supported here
    if (!typeof Worker) {
      console.log("Web worker not supported!");
      return;
    }

    // Listen message for indo worker
    const handleWorkerMessage = (msg: MessageEvent<MessageEventData>) => {
      console.log("Heavy task result", msg.data.payload);

      // Terminate the web worker
      indoWorker.terminate();
      chineseWorker.terminate();
    };
    indoWorker.onmessage = handleWorkerMessage;

    // Transfer port1 to the indo worker
    // Send data to the worker
    indoWorker.postMessage(
      {
        action: Action.PLAY,
        payload: "PAYLOAD_FROM_INDO_WORKER",
        port: channel.port1,
      },
      [channel.port1]
    );

    // Transfer port2 to the chinese worker
    // Send data to the worker
    chineseWorker.postMessage(
      {
        action: Action.PLAY,
        payload: "PAYLOAD_FROM_CHINESE_WORKER",
        port: channel.port2,
      },
      [channel.port2]
    );
  };

  return (
    <div>
      <h1>Web Worker - Native API</h1>
      <button onClick={handleStartWorker}>Start Worker</button>
    </div>
  );
}

export default WebWorkerNativePlayground;
