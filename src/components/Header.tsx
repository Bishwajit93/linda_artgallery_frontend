"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa";

export default function Header() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Über mich" },
    { href: "/galerie", label: "Galerie" },
    { href: "/kontakt", label: "Kontakt" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F5F3E7] text-[#1b1d1e] border-b border-[#C9A227]/30">
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center px-8 py-5">
        
        {/* Left: Brand */}
        <div className="justify-self-start ">
          <Link href="/" className="text-2xl font-semibold tracking-wide">
            Linda Güzel
          </Link>
        </div>

        {/* Center: Nav */}
        <nav className="hidden md:flex justify-center gap-16 text-[15px] font-medium">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative pb-1 transition-colors ${
                  active
                    ? "text-[#C9A227] after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:w-full after:bg-[#C9A227]"
                    : "hover:text-[#C9A227]"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Socials */}
        <div className="hidden md:flex gap-8 justify-self-end">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#C9A227]">
            <FaInstagram className="w-5 h-5" />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-[#C9A227]">
            <FaTiktok className="w-5 h-5" />
          </a>
          <Link href="/kontakt" className="hover:text-[#C9A227]">
            <FaEnvelope className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
