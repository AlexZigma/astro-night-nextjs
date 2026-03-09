"use client";

import Filters from "@/components/pages/Storage/Filters";
import MovieGrid from "@/components/pages/Storage/Grid";

export default function StoragePage() {
  return (
    <main>
      <Filters />
      <MovieGrid />
    </main>
  );
}
