import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";

import type { AppDispatch, AppStore, RootState } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export function useClickOutside<T extends HTMLElement>(onClick: () => void) {
  const targetRef = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        targetRef.current &&
        !targetRef.current.contains(event.target as Node)
      ) {
        onClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClick]);

  return targetRef;
}

export function useLocalStorage<T>(key: string) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return [] as T;

    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : ([] as T);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
