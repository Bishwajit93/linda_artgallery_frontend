import type { Metadata } from "next";
import "./globals.css";
import LayoutClient from "./layoutClient"; // client wrapper

export const metadata: Metadata = {
  title: "Linda Güzel | Galerie",
  description: "Künstlerische Arbeiten von Linda Güzel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" translate="no" suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="flex flex-col min-h-screen bg-[#f7f7f7] text-[#1b1d1e] pb-[64px] md:pb-0">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
