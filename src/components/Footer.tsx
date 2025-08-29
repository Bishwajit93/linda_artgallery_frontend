"use client";

import Link from "next/link";
import { FaInstagram, FaTiktok, FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";

function CurrentYear() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  if (!year) return null; // nothing until client renders
  return <>{year}</>;
}

export default function Footer() {
  return (
    <footer className="bg-[#F5F3E7] text-[#1b1d1e] text-sm border-t border-[#C9A227]/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center px-8 py-8 gap-6">
        
        {/* Left: Copyright */}
        <div className="justify-self-start">
          <p className="opacity-80">
            © <CurrentYear /> Linda Güzel. Alle Rechte vorbehalten.
          </p>
        </div>

        {/* Middle: Legal */}
        <nav className="flex justify-center gap-12">
          <Link href="/impressum" className="hover:text-[#C9A227] hover:underline">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:text-[#C9A227] hover:underline">
            Datenschutz
          </Link>
        </nav>

        {/* Right: Socials */}
        <div className="flex gap-8 justify-self-end">
          <a 
            href="https://www.instagram.com/l.i.nd.a?igsh=MXVnY2UzMG41N2dsZg%3D%3D&utm_source=qr"
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-[#C9A227]">
            <FaInstagram className="w-5 h-5" />
          </a>
          <a 
            href="https://www.tiktok.com/@l.i.nd.aa?_t=ZN-8tmNAkPbRX4&_r=1"
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-[#C9A227]">
            <FaTiktok className="w-5 h-5" />
          </a>
          <a
            href="https://de.linkedin.com/in/linda-g%C3%BCzel-862a71256"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#C9A227]"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
