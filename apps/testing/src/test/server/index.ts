export const initMocks = async () => {
  if (process.env.NODE_ENV === "development") {
    if (typeof window === "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { server } = await import("./server");
      return server.listen();
    } else {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { worker } = await import("./browser");
      return worker.start();
    }
  }
};
