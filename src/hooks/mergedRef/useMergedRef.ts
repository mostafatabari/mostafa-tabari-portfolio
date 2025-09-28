import { useCallback } from "react";

type MergedRef<T> = React.Ref<T> | React.RefObject<T | null>;

/* Custom hook to merge multiple refs into a single ref callback */
export function useMergedRef<T>(...refs: (MergedRef<T> | undefined)[]) {
  return useCallback(
    (value: T | null) => {
      /* Loop through all provided refs */
      refs.forEach((ref) => {
        if (!ref) return; // Skip if ref is undefined

        if (typeof ref === "function") {
          /* If the ref is a function ref, call it with the value */
          ref(value);
        } else {
          /* If object ref, set `current` (can be null on unmount) */
          (ref as React.RefObject<T | null>).current = value;
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs // Recreate callback only if refs array changes
  );
}
