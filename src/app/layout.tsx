import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileHeader from "@/components/MobileHeader";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "Linda Güzel | Galerie",
  description: "Künstlerische Arbeiten von Linda Güzel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body
        className="
          flex flex-col min-h-screen bg-[#f7f7f7] text-[#1b1d1e]
          pb-[64px] md:pb-0   /* space for mobile bottom nav only on small screens */
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

        {/* Desktop footer: visible on md+ so it can't be obscured by mobile nav */}
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
