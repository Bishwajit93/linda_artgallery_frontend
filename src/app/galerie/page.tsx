import SequentialVideoPlayer from "@/components/SequentialVideoPlayer";
import { fetchImages } from "@/lib/imageApi";
import GalleryGrid from "@/components/GalleryGrid";

export const revalidate = 60;

export default async function GalleryPage() {
  const images = await fetchImages();

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Gallery</h1>

      {/* Video playlist */}
      <div className="mb-12">
        <SequentialVideoPlayer />
      </div>

      {/* Images below */}
      <GalleryGrid images={images} />
    </main>
  );
}
