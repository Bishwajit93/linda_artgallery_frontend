"use client";

import Link from "next/link";
import { FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-footer-bg)] text-[var(--color-bg)] py-6 px-4 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-center md:text-left">
          © 2025 Linda Güzel. Alle Rechte vorbehalten.
        </p>
        <div className="flex gap-6 text-xl">
          <Link
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-hover)] transition-colors duration-300"
          >
            <FaInstagram />
          </Link>
          <Link
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-hover)] transition-colors duration-300"
          >
            <FaTwitter />
          </Link>
          <Link
            href="/kontakt"
            className="hover:text-[var(--color-hover)] transition-colors duration-300"
          >
            <FaEnvelope />
          </Link>
        </div>
      </div>
    </footer>
  );
}
