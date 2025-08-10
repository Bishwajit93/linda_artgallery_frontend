"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa";

export default function Header() {
  const pathname = usePathname();

  // Palette
  const borderGold = "rgba(181,155,106,0.45)";
  const textMain = "#000000"; // black
  const textDim = "rgba(0,0,0,0.75)";

  // Animations
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 6 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <header className="w-full h-[90px] md:h-[110px] relative">
      {/* Soft grayish-black transparent background with blur */}
      <div className="absolute inset-0 bg-[rgba(40,40,40,0.3)] backdrop-blur-md pointer-events-none" />
      {/* Bottom gold border */}
      <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: borderGold }} />

      <motion.div
        className="relative z-10 h-full grid grid-cols-3 items-center px-6 md:px-20"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Left: Name */}
        <motion.div variants={item}>
          <Link
            href="/"
            className="text-lg md:text-2xl font-semibold tracking-wide whitespace-nowrap"
            style={{ color: textMain }}
          >
            Linda Güzel
          </Link>
        </motion.div>

        {/* Center: Navigation */}
        <motion.nav
          className="flex justify-center gap-8 md:gap-12 text-sm md:text-base font-medium"
          variants={item}
          style={{ color: textDim }}
        >
          {[
            { href: "/", label: "Über mich" },
            { href: "/galerie", label: "Galerie" },
            { href: "/kontakt", label: "Kontakt" },
          ].map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative group pb-1 transition-colors"
                style={{ color: active ? textMain : textDim }}
              >
                {item.label}
              <span
                className={`absolute left-0 -bottom-[2px] h-[2px] w-full transition-opacity ${
                  active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
                style={{ background: "currentColor" }} // antique gold, stronger opacity
              />

              </Link>
            );
          })}
        </motion.nav>

        {/* Right: Socials */}
        <motion.div
          className="flex justify-end gap-5 md:gap-6 text-xl"
          variants={item}
          style={{ color: textDim }}
        >
          <Link href="https://www.instagram.com/l.i.nd.a" target="_blank" rel="noreferrer" className="hover:opacity-100">
            <FaInstagram />
          </Link>
          <Link href="https://www.tiktok.com/@l.i.nd.aa" target="_blank" rel="noreferrer" className="hover:opacity-100">
            <FaTiktok />
          </Link>
          <Link href="/kontakt" className="hover:opacity-100">
            <FaEnvelope />
          </Link>
        </motion.div>
      </motion.div>
    </header>
  );
}
