"use client";

import Link from "next/link";

export default function Footer() {
  const borderGold = "rgba(181,155,106,0.45)";
  const textMain = "#000000"; // black
  const textDim = "rgba(0,0,0,0.75)";

  return (
    <footer className="w-full relative min-h-[110px]">
      {/* Soft grayish-black transparent background with blur */}
      <div className="absolute inset-0 bg-[rgba(40,40,40,0.3)] backdrop-blur-md pointer-events-none" />
      {/* Top gold border */}
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: borderGold }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs md:text-sm" style={{ color: textDim }}>
          © 2025 Linda Güzel. Alle Rechte vorbehalten.
        </p>

        <div className="flex gap-8 text-lg" style={{ color: textDim }}>
          <Link href="https://www.instagram.com" target="_blank" rel="noreferrer" className="hover:opacity-100">
            Instagram
          </Link>
          <Link href="https://www.tiktok.com" target="_blank" rel="noreferrer" className="hover:opacity-100">
            TikTok
          </Link>
          <Link href="/kontakt" className="hover:opacity-100">
            E-Mail
          </Link>
        </div>
      </div>
    </footer>
  );
}
