"use client";

import { useEffect, useState } from "react";
import { fetchVideos, GalleryVideo } from "@/lib/videoApi";

export default function HeroVideoSection() {
  // State for currently featured video
  const [featured, setFeatured] = useState<GalleryVideo | null>(null);

  // Function: load newest published video
  const loadFeatured = async () => {
    try {
      const vids = await fetchVideos();

      // Filter only published
      const published = vids.filter((v) => v.is_published);

      // Sort by newest first
      published.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      // Pick the first one (newest published)
      setFeatured(published[0] ?? null);
    } catch (e) {
      console.error("Failed to load videos", e);
    }
  };

  // Effect: load video once + auto refresh every 10s
  useEffect(() => {
    loadFeatured();
    const interval = setInterval(loadFeatured, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden">
      {/* Video (if exists) */}
      {featured?.file_url ? (
        <video
          key={featured.id}
          src={featured.file_url}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        // Fallback background when no video is uploaded yet
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700" />
      )}

      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Always show Linda’s name bottom-right with glow */}
      <div
        className="absolute bottom-6 right-6 z-10 text-white text-2xl md:text-4xl font-light italic tracking-wide"
        style={{
          textShadow: `
            0 0 6px rgba(255, 255, 255, 0.9),
            0 0 12px rgba(255, 215, 0, 0.5),
            0 0 20px rgba(255, 215, 0, 0.4)
          `,
          fontFamily: "'Dancing Script', cursive",
        }}
      >
        Linda Güzel
      </div>

      {/* Placeholder for video title/description (currently hidden) */}
      {false && (
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            {featured?.title || ""}
          </h1>
          <p className="mt-3 max-w-2xl text-base md:text-lg opacity-90">
            {featured?.description || ""}
          </p>
        </div>
      )}
    </section>
  );
}
