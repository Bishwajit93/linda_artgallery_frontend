// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next"
export const metadata: Metadata = {
  title: "Linda Güzel – Galerie",
  description: "Persönliche Kunstgalerie und Portfolio von Linda Güzel.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" data-theme="light">
      <body className="flex flex-col min-h-screen bg-white text-black overflow-x-hidden">
        {/* Header */}
        <Header />

        {/* Main content fills remaining space */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
