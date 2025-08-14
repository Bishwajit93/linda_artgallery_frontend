"use client";

import { useEffect, useState } from "react";
import { fetchVideos, GalleryVideo } from "@/lib/videoApi";

export default function HeroVideoSection() {
  const [featured, setFeatured] = useState<GalleryVideo | null>(null);

  const loadFeatured = async () => {
    try {
      const vids = await fetchVideos();
      // sort so newest published video comes first
      const published = vids.filter((v) => v.is_published);
      published.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setFeatured(published[0] ?? null);
    } catch (e) {
      console.error("Failed to load videos", e);
    }
  };

  useEffect(() => {
    loadFeatured();

    // OPTIONAL: refresh every 10s so new uploads show without manual reload
    const interval = setInterval(loadFeatured, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden">
      {featured?.file_url ? (
        <video
          key={featured.id}
          src={featured.file_url}
          poster={featured.poster_url || ""}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
          {featured?.title || "Linda Güzel"}
        </h1>
        <p className="mt-3 max-w-2xl text-base md:text-lg opacity-90">
          {featured?.description || "Contemporary art in motion."}
        </p>
      </div>
    </section>
  );
}
