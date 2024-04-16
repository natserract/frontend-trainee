import { act } from "@testing-library/react";

import { createRenderer } from "../test";
import useSelectedItems from "./useSelectedItems";

type UseSelectedItemData = {
  id: number;
  name: string;
  phone: string;
};

type UseSelectedItemKey = number;

describe("useSelectedItems", () => {
  const { renderHook } = createRenderer();

  it("works correctly when update/add the items", async () => {
    const { result } = renderHook(() =>
      useSelectedItems<UseSelectedItemData, UseSelectedItemKey>(),
    );

    act(() => {
      result.current.updateSelectedItem(
        {
          id: 1,
          name: "Alfin",
          phone: "08881239123",
        },
        1,
      );
    });

    expect(result.current.selectedItems).toEqual([
      {
        id: 1,
        name: "Alfin",
        phone: "08881239123",
      },
    ]);

    expect(result.current.selectedItemsLen).toEqual(1);
  });

  it("should toggled value if there's exist", async () => {
    const { result } = renderHook(() =>
      useSelectedItems<UseSelectedItemData, UseSelectedItemKey>(),
    );

    act(() => {
      // Call twice
      result.current.updateSelectedItem(
        {
          id: 1,
          name: "Alfin",
          phone: "08881239123",
        },
        1,
      );
      result.current.updateSelectedItem(
        {
          id: 1,
          name: "Alfin",
          phone: "08881239123",
        },
        1,
      );
    });

    expect(result.current.selectedItemsLen).toEqual(0);
  });

  it("works correctly when removing the item", async () => {
    const { result } = renderHook(() =>
      useSelectedItems<UseSelectedItemData, UseSelectedItemKey>(),
    );

    act(() => {
      result.current.updateSelectedItem(
        {
          id: 1,
          name: "Alfin",
          phone: "08881239123",
        },
        1,
      );

      result.current.updateSelectedItem(
        {
          id: 2,
          name: "Surya",
          phone: "08881239123",
        },
        2,
      );
    });

    expect(result.current.selectedItemsLen).toEqual(2);

    act(() => {
      // Remove the item key `2``
      result.current.removeSelectedItem(2);
    });

    expect(result.current.selectedItemsLen).toEqual(1);
  });

  it("works correctly when is cleared", () => {
    const { result } = renderHook(() =>
      useSelectedItems<UseSelectedItemData, UseSelectedItemKey>(),
    );

    act(() => {
      result.current.updateSelectedItem(
        {
          id: 1,
          name: "Alfin",
          phone: "08881239123",
        },
        1,
      );

      result.current.updateSelectedItem(
        {
          id: 2,
          name: "Surya",
          phone: "08881239123",
        },
        2,
      );
    });

    expect(result.current.selectedItemsLen).toEqual(2);

    act(() => {
      result.current.clear();
    });

    expect(result.current.selectedItemsLen).toEqual(0);
  });

  it("calls isSelected in case of updated/added new item", () => {
    const { result } = renderHook(() =>
      useSelectedItems<UseSelectedItemData, UseSelectedItemKey>(),
    );

    act(() => {
      result.current.updateSelectedItem(
        {
          id: 1,
          name: "Alfin",
          phone: "08881239123",
        },
        1,
      );
    });

    expect(result.current.isSelected(1)).toBeTruthy();
  });
});
