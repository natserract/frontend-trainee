import { PropsWithChildren, ReactElement } from "react";

function Tab({ id, children }: PropsWithChildren<{ id: number }>) {
  return <div id={`step_${id}`}>{children}</div>;
}

export function* generateTabsIterator(): Generator<ReactElement> {
  yield (
    <Tab key={1} id={1}>
      Step 1
    </Tab>
  );
  yield (
    <Tab key={2} id={2}>
      Step 2{" "}
    </Tab>
  );
  yield (
    <Tab key={3} id={3}>
      Step 3
    </Tab>
  );
  yield (
    <Tab key={4} id={4}>
      Step 4
    </Tab>
  );
}
