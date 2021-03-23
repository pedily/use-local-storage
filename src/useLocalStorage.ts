import { useEffect, useState } from "react";

/**
 * Is supposed to work just like the "setter" function from "useState"
 */
export type TValueSetter<T> = (newValue: T | ((oldValue: T) => void)) => void;

export type UseLocalStorageReturnValue<T> = [T, TValueSetter<T>];

const parseLocalStorageValue = (value: string | null) => {
  if (value === null) return undefined;

  return JSON.parse(value);
};

export const useLocalStorage = <T = any>(
  key: string,
  defaultValue?: T
): UseLocalStorageReturnValue<T> => {
  /**
   * This hold the value, raw.
   * When initialized, will try to load the acual value from localstorage,
   * preferred over the default value
   */
  const [localValue, setLocalValue] = useState<T>(
    () => parseLocalStorageValue(localStorage.getItem(key)) ?? defaultValue
  );

  const setValue: TValueSetter<T> = (valueOrFn) => {
    const newValue = (() => {
      if (typeof valueOrFn === "function") {
        return (valueOrFn as Function)(localValue);
      }

      return valueOrFn;
    })();

    localStorage.setItem(key, JSON.stringify(newValue));
    setLocalValue(newValue);
  };

  useEffect(() => {
    const storageHandler = (e: StorageEvent) => {
      if (e.key !== key) return;

      setLocalValue(parseLocalStorageValue(e.newValue));
    };

    window.addEventListener("storage", storageHandler);

    return () => {
      window.removeEventListener("storage", storageHandler);
    };
  }, [key]);

  /**
   * In case the LS value was not set yet, the "default value"
   * will be written into LS (if defined)
   */
  useEffect(() => {
    if (localStorage.getItem(key) === null && defaultValue !== undefined) {
      setValue(defaultValue);
    }
  }, []);

  return [localValue, setValue];
};
