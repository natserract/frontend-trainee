export const channel = new MessageChannel();

export const makeWorker = (url: string) => {
  return new Worker(new URL(url, import.meta.url));
};

export const indoWorker = makeWorker("./indo-worker.ts");
export const chineseWorker = makeWorker("./chinese-worker.ts");
