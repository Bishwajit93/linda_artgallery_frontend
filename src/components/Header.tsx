"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const [typedText, setTypedText] = useState("");
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const pathname = usePathname();
  const fullText = "Linda Güzel";

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(typing);
    }, 150);
    return () => clearInterval(typing);
  }, []);

  useEffect(() => {
    setTimeout(() => setShouldAnimate(false), 1500);
  }, []);

  const glowStyle = {
    textShadow: "0 0 6px rgba(255, 255, 255, 0.8)",
  };

  return (
    <header className="w-full h-[90px] md:h-[110px] bg-transparent relative">
      {/* Optional overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Bright glowing orange underline */}
      <div
        className="absolute bottom-0 left-0 w-full h-[3px] bg-orange-400"
        style={{
          boxShadow:
            "0 0 8px rgba(251,146,60,0.9), 0 0 16px rgba(251,146,60,0.7), 0 0 24px rgba(251,146,60,0.5)",
        }}
      ></div>

      <div className="relative z-10 h-full grid grid-cols-3 items-center px-6 md:px-20">
        {/* Left: Name */}
        <Link
          href="/"
          className="text-white text-xl md:text-3xl font-bold tracking-wide whitespace-nowrap hover:text-orange-400 transition"
          style={{ ...glowStyle, minWidth: "9.5ch" }}
        >
          {typedText}
        </Link>

        {/* Center: Nav */}
        <motion.nav
          initial={shouldAnimate ? { opacity: 0, y: -10 } : false}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 1 }}
          className="flex justify-center gap-8 md:gap-14 text-sm md:text-lg text-white font-semibold"
        >
          <Link
            href="/"
            className={`relative transition hover:text-orange-400 ${
              pathname === "/"
                ? "text-orange-400 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-orange-400 after:shadow-md"
                : ""
            }`}
          >
            Über mich
          </Link>
          <Link
            href="/galerie"
            className={`relative transition hover:text-orange-400 ${
              pathname === "/galerie"
                ? "text-orange-400 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-orange-400 after:shadow-md"
                : ""
            }`}
          >
            Galerie
          </Link>
          <Link
            href="/kontakt"
            className={`relative transition hover:text-orange-400 ${
              pathname === "/kontakt"
                ? "text-orange-400 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-orange-400 after:shadow-md"
                : ""
            }`}
          >
            Kontakt
          </Link>
        </motion.nav>

        {/* Right: Icons */}
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: -10 } : false}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : false}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex justify-end gap-8 text-white text-xl md:text-2xl"
        >
          <Link
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-400 transition"
            style={glowStyle}
          >
            <FaTiktok />
          </Link>
          <Link
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-400 transition"
            style={glowStyle}
          >
            <FaInstagram />
          </Link>
          <Link
            href="/kontakt"
            className="hover:text-orange-400 transition"
            style={glowStyle}
          >
            <FaEnvelope />
          </Link>
        </motion.div>
      </div>
    </header>
  );
}
