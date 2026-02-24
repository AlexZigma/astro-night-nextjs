import "@/styles/globals.scss";

import clsx from "clsx";
import type { Metadata } from "next";
import { Alata, Anonymous_Pro } from "next/font/google";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(anonymousPro.variable, alata.variable)}>
        {children}
      </body>
    </html>
  );
}
