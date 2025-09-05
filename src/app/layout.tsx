import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileNav from "@/components/layout/MobileNav";

export const metadata: Metadata = {
  title: "Linda Güzel | Galerie",
  description: "Künstlerische Arbeiten von Linda Güzel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // ✅ Lock html attrs; tolerate extensions with suppressHydrationWarning
    <html lang="de" translate="no" suppressHydrationWarning>
      <head>
        {/* ✅ Hint to Google not to auto-translate the page */}
        <meta name="google" content="notranslate" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body
        className="
          flex flex-col min-h-screen bg-[#f7f7f7] text-[#1b1d1e]
          pb-[64px] md:pb-0
        "
      >
        {/* Mobile top bar (fixed) */}
        <div className="md:hidden">
          <MobileHeader />
        </div>

        {/* Desktop header (fixed) */}
        <div className="hidden md:block">
          <Header />
        </div>

        {/* Content: offset for fixed headers (mobile vs desktop heights) */}
        <main className="flex-grow mt-[56px] md:mt-[112px]">
          {children}
        </main>

        {/* Desktop footer */}
        <div className="hidden md:block">
          <Footer />
        </div>

        {/* Mobile bottom nav (fixed) */}
        <div className="md:hidden">
          <MobileNav />
        </div>
      </body>
    </html>
  );
}
