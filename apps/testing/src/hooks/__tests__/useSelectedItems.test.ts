import { renderHook, waitFor } from "@testing-library/react";

import useSelectedItems from "../useSelectedItems";

describe("useSelectedItems", () => {
  test("Returns", async () => {
    const { result } = renderHook(() => useSelectedItems());
  });
});
