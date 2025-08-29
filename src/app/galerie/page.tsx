import ImageGrid from "@/components/ImageGrid";

export const metadata = {
  title: "Galerie – Linda Güzel",
};

export default function GaleriePage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <header className="max-w-7xl mx-auto px-4 pt-8 pb-2">
        <h1 className="text-2xl font-semibold tracking-wide">Galerie</h1>
      </header>
      <ImageGrid />
    </main>
  );
}
