"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

import Filters from "@/components/pages/Storage/Filters";

const MovieGrid = dynamic(() => import("@/components/pages/Storage/Grid"), {
  ssr: false,
});

export default function StoragePage() {
  return (
    <main>
      <Filters />
      <Suspense>
        <MovieGrid />
      </Suspense>
    </main>
  );
}
