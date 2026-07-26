import "@/styles/globals.scss";

import clsx from "clsx";
import type { Metadata } from "next";
import { Alata, Anonymous_Pro } from "next/font/google";

import Footer from "@/components/commons/Footer";
import Header from "@/components/commons/Header";
import Alert from "@/components/commons/Modal/Alert";
import MovieModal from "@/components/commons/Modal/MovieModal";

import StoreProvider from "./StoreProvider";

const anonymousPro = Anonymous_Pro({
  weight: ["400", "700"],
  variable: "--font-anonymous-pro",
});

const alata = Alata({
  weight: ["400"],
  variable: "--font-alata",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Astro Night",
  description: "Astro Night is a movie library",
  icons: {
    icon: [
      {
        url: "/favicon_light.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon_dark.ico",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(anonymousPro.variable, alata.variable)}>
        <StoreProvider>
          <Header />

          {children}
          <MovieModal />
          <Alert />
        </StoreProvider>
        <Footer />
      </body>
    </html>
  );
}
