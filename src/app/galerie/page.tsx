// app/gallery/page.tsx
import { fetchImages } from "@/lib/imageApi";
import GalleryGrid from "@/components/GalleryGrid";
import SequentialVideoPlayer from "@/components/SequentialVideoPlayer";

export const revalidate = 60; // ISR for this page

export default async function GalleryPage() {
  const images = await fetchImages();

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Gallery</h1>

      {/* Sequential video autoplay section */}
      <div className="mb-12">
        <SequentialVideoPlayer />
      </div>

      {/* Existing image gallery */}
      <GalleryGrid images={images} />
    </main>
  );
}
