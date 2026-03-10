"use client";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

import { AppStore, makeStore } from "@/lib/store";
import { initializeMovies } from "@/models/movies/moviesSlice";
import { loadMoviesFromLocalStorage } from "@/models/movies/utils";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store] = useState<AppStore>(() => makeStore());

  useEffect(() => {
    const movies = loadMoviesFromLocalStorage();
    store.dispatch(initializeMovies(movies));
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
