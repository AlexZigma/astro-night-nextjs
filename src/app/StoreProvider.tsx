"use client";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

import { AppStore, makeStore } from "@/lib/store";
import { initializeMoviesRequest } from "@/models/movies/moviesSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store] = useState<AppStore>(() => makeStore());

  useEffect(() => {
    store.dispatch(initializeMoviesRequest());
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
