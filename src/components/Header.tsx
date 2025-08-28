import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Brand (left) */}
        <Link href="/" className="text-xl font-semibold tracking-wide">
          Linda Güzel
        </Link>

        {/* Nav (right) — desktop-first, simple mobile fallback */}
        <nav className="flex gap-6 text-sm">
          <Link href="/" className="hover:underline">Über mich</Link>
          <Link href="/galerie" className="hover:underline">Galerie</Link>
          <Link href="/kontakt" className="hover:underline">Kontakt</Link>
        </nav>
      </div>
    </header>
  );
}
