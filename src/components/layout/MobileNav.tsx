"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import MobileConnectModal from "./MobileConnectModal";

export default function MobileNav() {
  const pathname = usePathname();
  const [connectOpen, setConnectOpen] = useState(false);

  const items = [
    { href: "/", label: "Über mich" },
    { href: "/galerie", label: "Galerie" },
    { href: "/kontakt", label: "Kontakt" },
  ];

  return (
    <>
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50
                   bg-[#F5F3E7] border-t border-[#C9A227]/30
                   pb-[max(env(safe-area-inset-bottom),0px)]"
        aria-label="Hauptnavigation mobil"
      >
        <ul className="grid grid-cols-4 text-sm text-[#1b1d1e]">
          {items.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className="flex flex-col items-center justify-center gap-1 py-3"
                >
                  <span className={active ? "text-[#C9A227] font-semibold" : ""}>
                    {label}
                  </span>
                  <span
                    className={`mt-1 h-[2px] w-8 rounded-full ${
                      active ? "bg-[#C9A227]" : "bg-transparent"
                    }`}
                  />
                </Link>
              </li>
            );
          })}

          {/* Verbinden (modal trigger) */}
          <li>
            <button
              type="button"
              onClick={() => setConnectOpen(true)}
              className="w-full flex flex-col items-center justify-center gap-1 py-3 cursor-pointer"
              aria-haspopup="dialog"
              aria-controls="connect-modal"
            >
              <span>Verbinden</span>
              <span className="mt-1 h-[2px] w-8 rounded-full bg-transparent" />
            </button>
          </li>
        </ul>
      </nav>

      {/* Modal */}
      <MobileConnectModal
        open={connectOpen}
        onClose={() => setConnectOpen(false)}
        instagramUrl="https://www.instagram.com/l.i.nd.a?igsh=MXVnY2UzMG41N2dsZg%3D%3D&utm_source=qr"
        tiktokUrl="https://www.tiktok.com/@l.i.nd.aa?_t=ZN-8tmNAkPbRX4&_r=1"
        linkedinUrl="https://de.linkedin.com/in/linda-g%C3%BCzel-862a71256"
      />
    </>
  );
}
