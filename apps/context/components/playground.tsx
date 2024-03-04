"use client";
import { ChildConsumer } from "./child-consumer";
import { ComponentContextProvider } from "./init-context";

export function ContextPlayground() {
  return (
    <ComponentContextProvider>
      <ChildConsumer />
    </ComponentContextProvider>
  );
}
