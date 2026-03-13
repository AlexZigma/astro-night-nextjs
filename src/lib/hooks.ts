import { useRouter } from "next/router";
import { useEffect, useRef, useState, useTransition } from "react";
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

type ObserverCallback = () => void;

const createRouteObserver = () => {
  let observer: ObserverCallback | null = null;

  const setObserver = (callback: ObserverCallback) => {
    observer = callback;
  };

  const notify = () => {
    if (observer) {
      observer();
    }
  };

  return { setObserver, notify };
};

const routeObserver = createRouteObserver();

export const useAsyncRouteReplace = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const asynPush = async (path: string) => {
    return new Promise<void>((resolve) => {
      startTransition(() => {
        router.replace(path);
      });

      routeObserver.setObserver(() => {
        resolve();
      });
    });
  };

  useEffect(() => {
    if (!isPending) {
      routeObserver.notify();
    }
  }, [isPending]);

  return asynPush;
};
