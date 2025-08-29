import Link from "next/link";
import { FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#F5F3E7] text-[#1b1d1e] text-sm border-t border-[#C9A227]/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center px-8 py-6 gap-6">
        
        {/* Left: Copyright */}
        <div className="justify-self-start">
          <p className="opacity-80">
            © {new Date().getFullYear()} Linda Güzel. Alle Rechte vorbehalten.
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
    </footer>
  );
}
