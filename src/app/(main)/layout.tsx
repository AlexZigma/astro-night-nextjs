import React from "react";

import Footer from "@/components/commons/Footer";
import Header from "@/components/commons/Header";

import { ModalProvider } from "./ModalProvider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModalProvider>
      <Header />
      {children}
      <Footer />
    </ModalProvider>
  );
}
