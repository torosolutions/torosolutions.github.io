import { useCallback, useState } from 'react';
import { getStoredValue, setStoredValue } from '../utils/storage';

export function usePersistentState<T>(
  key: string,
  initialValue: T,
): [T, (val: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() =>
    getStoredValue(key, initialValue),
  );

  const setPersistentState = useCallback(
    (value: T | ((prev: T) => T)) => {
      setState((prev) => {
        const next =
          typeof value === 'function' ? (value as (prev: T) => T)(prev) : value;
        setStoredValue(key, next);
        return next;
      });
    },
    [key],
  );

  return [state, setPersistentState];
}
