import Link from "next/link";

export default function MobileHeader() {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#F5F3E7] border-b border-[#C9A227]/30">
      <div className="px-5 py-4 text-center">
        <Link href="/" className="text-lg font-semibold tracking-wide text-[#1b1d1e]">
          Linda Güzel
        </Link>
      </div>
    </header>
  );
}
