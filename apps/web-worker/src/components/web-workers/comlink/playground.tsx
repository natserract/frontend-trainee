type WorkerModule = typeof import("./worker");
const workerInstance = new ComlinkWorker<WorkerModule>(
  new URL("./worker", import.meta.url)
);

function WebWorkerComlinkPlayground() {
  const handleStartWorker = async () => {
    // Send data to the worker
    workerInstance.createMessage("John Doe").then((message: string): void => {
      console.log("[App] MyComlinkWorker message:", message);
    });
  };

  return (
    <div>
      <h1>Web Worker - Comlink</h1>
      <button onClick={handleStartWorker}>Start Worker</button>
    </div>
  );
}

export default WebWorkerComlinkPlayground;
