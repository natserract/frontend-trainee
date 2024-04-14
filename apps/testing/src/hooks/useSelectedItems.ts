import { useCallback, useMemo, useState } from "react";

export default function useSelectedItems<T extends object>() {
  const [selectedItems, setSelectedItems] = useState<Map<string | number, T>>(
    new Map(),
  );

  const selectedItemsLen = useMemo(() => selectedItems.size, [selectedItems]);

  const isSelected = useCallback(
    (key: string) => {
      return selectedItems.has(key);
    },
    [selectedItems],
  );

  const updateSelectedItem = useCallback((data: T, key: string | number) => {
    setSelectedItems((items) => {
      const updatedItems = new Map(items);

      if (updatedItems.has(key)) {
        updatedItems.delete(key);
      } else {
        updatedItems.set(key, data);
      }

      return updatedItems;
    });
  }, []);

  const removeSelectedItem = useCallback((key: string | number) => {
    setSelectedItems((items) => {
      const updatedItems = new Map(items);
      updatedItems.delete(key);

      return updatedItems;
    });
  }, []);

  const clear = useCallback(() => {
    setSelectedItems(new Map());
  }, []);

  return {
    isSelected,
    removeSelectedItem,
    updateSelectedItem,
    selectedItems: [...selectedItems.values()],
    selectedItemsLen,
    clear,
  };
}
