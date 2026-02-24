import React from "react";

import Footer from "@/components/commons/Footer/Footer";
import Header from "@/components/commons/Header/Header";

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
