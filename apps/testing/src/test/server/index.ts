export const initMocks = async () => {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { worker } = await import("./browser");
  return worker.start();
};
