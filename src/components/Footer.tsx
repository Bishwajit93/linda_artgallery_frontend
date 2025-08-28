export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="opacity-80">© {new Date().getFullYear()} Linda Güzel. Alle Rechte vorbehalten.</p>
        <div className="flex gap-4">
          <a href="/impressum" className="hover:underline">Impressum</a>
          <a href="/datenschutz" className="hover:underline">Datenschutz</a>
        </div>
      </div>
    </footer>
  );
}
