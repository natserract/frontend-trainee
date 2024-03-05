/// <reference lib="webworker" />
declare const self: DedicatedWorkerGlobalScope;

export const createMessage = (name: string): string => {
  return `Hello ${name}!`;
};
