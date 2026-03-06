import React from "react";

import Footer from "@/components/commons/Footer";
import Header from "@/components/commons/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
