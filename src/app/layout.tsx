import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Linda Güzel | Galerie",
  description: "Künstlerische Arbeiten von Linda Güzel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="flex flex-col min-h-screen bg-[#f7f7f7] text-[#1b1d1e]">
        <Header />
        {/* push content below fixed header (approx header height) */}
        <main className="flex-grow mt-[96px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
