import { useCallback, useMemo, useState } from "react";

export default function useSelectedItems<
  T extends object,
  K extends string | number,
>() {
  const [selectedItems, setSelectedItems] = useState<Map<K, T>>(new Map());

  const selectedItemsLen = useMemo(() => selectedItems.size, [selectedItems]);

  const isSelected = useCallback(
    (key: K) => {
      return selectedItems.has(key);
    },
    [selectedItems],
  );

  const updateSelectedItem = useCallback((data: T, key: K) => {
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

  const removeSelectedItem = useCallback((key: K) => {
    setSelectedItems((items) => {
      const updatedItems = new Map(items);
      updatedItems.delete(key);

      return updatedItems;
    });
  }, []);

  const clear = () => setSelectedItems(new Map());

  return {
    isSelected,
    removeSelectedItem,
    updateSelectedItem,
    selectedItems: [...selectedItems.values()],
    selectedItemsLen,
    clear,
  };
}
