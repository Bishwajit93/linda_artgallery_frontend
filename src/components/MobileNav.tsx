"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaUser, FaImages, FaEnvelope, FaShareAlt } from "react-icons/fa";
import MobileConnectModal from "./MobileConnectModal";

export default function MobileNav() {
  const pathname = usePathname();
  const [connectOpen, setConnectOpen] = useState(false);

  const items = [
    { href: "/",        label: "Über mich", icon: <FaUser className="w-5 h-5" /> },
    { href: "/galerie", label: "Galerie",   icon: <FaImages className="w-5 h-5" /> },
    { href: "/kontakt", label: "Kontakt",   icon: <FaEnvelope className="w-5 h-5" /> },
  ];

  return (
    <>
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50
                   bg-[#F5F3E7] border-t border-[#C9A227]/30
                   pb-[max(env(safe-area-inset-bottom),0px)]"
        aria-label="Hauptnavigation mobil"
      >
        <ul className="grid grid-cols-4 text-xs text-[#1b1d1e]">
          {items.map(({ href, label, icon }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className="flex flex-col items-center justify-center gap-1 py-3"
                >
                  <span className={active ? "text-[#C9A227]" : ""}>{icon}</span>
                  <span className={active ? "text-[#C9A227] font-medium" : ""}>{label}</span>
                  <span className={`mt-1 h-[2px] w-8 rounded-full ${active ? "bg-[#C9A227]" : "bg-transparent"}`} />
                </Link>
              </li>
            );
          })}

          {/* Connect (modal trigger) */}
          <li>
            <button
              type="button"
              onClick={() => setConnectOpen(true)}
              className="w-full flex flex-col items-center justify-center gap-1 py-3"
              aria-haspopup="dialog"
              aria-controls="connect-modal"
            >
              <FaShareAlt className="w-5 h-5" />
              <span>Connect</span>
              <span className="mt-1 h-[2px] w-8 rounded-full bg-transparent" />
            </button>
          </li>
        </ul>
      </nav>

      {/* Modal */}
      <MobileConnectModal
        open={connectOpen}
        onClose={() => setConnectOpen(false)}
        instagramUrl="https://instagram.com"
        tiktokUrl="https://tiktok.com"
        linkedinUrl="https://linkedin.com/in/lindaguzel"
      />
    </>
  );
}
