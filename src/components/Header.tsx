"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[var(--color-bg)] text-[var(--color-text)] shadow-md fixed top-0 left-0 w-full z-50 h-[100px] flex items-center px-6">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
        {/* Left side - Name */}
        <h1 className="text-2xl hover:text-[var(--color-hover)] transition-colors cursor-pointer">
            Linda Güzel
        </h1>

        {/* Right side - Navigation */}
        <nav className="flex gap-12 text-lg ">
          <Link href="/" className="hover:text-[var(--color-hover)] transition-colors">Über mich</Link>
          <Link href="/galerie" className="hover:text-[var(--color-hover)] transition-colors">Galerie</Link>
          <Link href="/kontakt" className="hover:text-[var(--color-hover)] transition-colors">Kontakt</Link>
        </nav>
      </div>
    </header>
  );
}
