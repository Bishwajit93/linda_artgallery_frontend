"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileNav from "@/components/layout/MobileNav";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile top bar (fixed) */}
      <div className="md:hidden">
        <MobileHeader />
      </div>

      {/* Desktop header (fixed) */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* Content: homepage no margin, others keep offset */}
      <main
        className={`flex-grow ${
          pathname === "/" ? "mt-0" : "mt-[56px] md:mt-[112px]"
        }`}
      >
        {children}
      </main>

      {/* Desktop footer */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden">
        <MobileNav />
      </div>
    </>
  );
}
