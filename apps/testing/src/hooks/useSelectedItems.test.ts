import { createRenderer } from "../test";

import useSelectedItems from "./useSelectedItems";

describe("useSelectedItems", () => {
  const { renderHook } = createRenderer();

  test("Returns", async () => {
    const { result } = renderHook(() => useSelectedItems());
  });
});
