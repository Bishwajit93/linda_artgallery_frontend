// app/gallery/page.tsx
import SequentialVideoPlayer from "@/components/SequentialVideoPlayer";

export const revalidate = 60;

export default function GalleryPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Gallery</h1>

      {/* Video playlist */}
      <SequentialVideoPlayer />
    </main>
  );
}
