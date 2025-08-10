"use client";

import Link from "next/link";
import { FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const borderGold = "rgba(181,155,106,0.45)";
  const textDim = "rgba(0,0,0,0.75)";

  return (
    <footer className="w-full relative min-h-[110px]">
      {/* Soft grayish-black transparent background with blur */}
      <div className="absolute inset-0 bg-[rgba(40,40,40,0.3)] backdrop-blur-md pointer-events-none" />
      {/* Top gold border */}
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: borderGold }} />

      <div className="relative z-10 h-full grid grid-cols-3 items-center px-6 md:px-20 py-10">
        {/* Left: Copyright */}
        <p className="text-xs md:text-sm" style={{ color: textDim }}>
          © 2025 Linda Güzel. Alle Rechte vorbehalten.
        </p>

        {/* Center: Empty for symmetry */}
        <div />

        {/* Right: Social icons */}
        <div className="flex justify-end gap-5 md:gap-8 text-xl" style={{ color: textDim }}>
          <Link
            href="https://www.instagram.com/l.i.nd.a"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-100"
            aria-label="Instagram"
          >
            <FaInstagram />
          </Link>
          <Link
            href="https://www.tiktok.com/@l.i.nd.aa"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-100"
            aria-label="TikTok"
          >
            <FaTiktok />
          </Link>
          <Link
            href="/kontakt"
            className="hover:opacity-100"
            aria-label="Kontakt"
          >
            <FaEnvelope />
          </Link>
        </div>
      </div>
    </footer>
  );
}
