// app/gallery/page.tsx
import SequentialVideoPlayer from "@/components/SequentialVideoPlayer";
import { fetchImages } from "@/lib/imageApi";
import GalleryGrid from "@/components/GalleryGrid";

export const revalidate = 60;

export default async function GalleryPage() {
  const images = await fetchImages();

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Gallery</h1>

      {/* Video playlist (auto-plays in a loop) */}
      <div className="mb-12">
        <SequentialVideoPlayer />
      </div>

      {/* Images below (optional – keep if you want) */}
      <GalleryGrid images={images} />
    </main>
  );
}
