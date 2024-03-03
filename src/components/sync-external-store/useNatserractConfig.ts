import { useMemo, useSyncExternalStore } from "react";

export function useNatserractConfig() {
  const [getSnapshot, subscribe] = useMemo(() => {
    function _getSnapshot() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return window.natserract; // React will subscribe this value if there's any update
    }

    function _subscribe(cb: () => void) {
      // Simulate to change the window.natserract value
      // React will resubscribe every time you pass a different subscribe function between re-renders
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        window.natserract = {
          backendURL: "https://yourapi.com/",
        };
        cb(); // call the callback to resubscribe;
      }, 2000);

      return () => {
        // Cleanup
        return void null;
      };
    }

    return [_getSnapshot, _subscribe];
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot);
}
