"use client";

import Link from "next/link";
import { FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const glowStyle = {
    textShadow: "0 0 6px rgba(255, 255, 255, 0.8)",
  };

  return (
    <footer className="w-full bg-transparent relative text-white min-h-[110px]">
      {/* Optional overlay for readability */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Bright glowing orange line on top */}
      <div
        className="absolute top-0 left-0 w-full h-[3px] bg-orange-400"
        style={{
          boxShadow:
            "0 0 8px rgba(251,146,60,0.9), 0 0 16px rgba(251,146,60,0.7), 0 0 24px rgba(251,146,60,0.5)",
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-center md:text-left" style={glowStyle}>
          © 2025 Linda Güzel. Alle Rechte vorbehalten.
        </p>

        <div className="flex gap-10 text-xl">
          <Link
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-400 transition-colors duration-300"
            style={glowStyle}
          >
            <FaInstagram />
          </Link>
          <Link
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-400 transition-colors duration-300"
            style={glowStyle}
          >
            <FaTwitter />
          </Link>
          <Link
            href="/kontakt"
            className="hover:text-orange-400 transition-colors duration-300"
            style={glowStyle}
          >
            <FaEnvelope />
          </Link>
        </div>
      </div>
    </footer>
  );
}
