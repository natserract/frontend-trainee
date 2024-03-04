import { ReactElement, useState } from "react";

import { generateTabsIterator } from "./tabs";

const iterator = generateTabsIterator();
const headIterator = iterator.next();

function LazyRenderingPlayground() {
  const [tabs, setRenderedTabs] = useState<ReactElement[]>([
    headIterator.value,
  ]);

  const handleNextStep = () => {
    const { value, done } = iterator.next();
    if (!done) {
      setRenderedTabs((state) => [...state, value]);
    }
  };

  return (
    <>
      {tabs}
      <button onClick={handleNextStep}>Next Step</button>
    </>
  );
}

export default LazyRenderingPlayground;
