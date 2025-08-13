// app/gallery/page.tsx
import { fetchImages } from "@/lib/imageApi";
import GalleryGrid from "@/components/GalleryGrid";

export const revalidate = 60; // ISR for this page as well

export default async function GalleryPage() {
  const images = await fetchImages();
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Gallery</h1>
      <GalleryGrid images={images} />
    </main>
  );
}
