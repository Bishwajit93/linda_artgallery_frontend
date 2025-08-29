"use client";

import { useEffect, useState } from "react";
import { fetchHeroVideo } from "@/lib/videoApi";
import { Video } from "@/types/video";

export default function HeroVideo() {
  const [video, setVideo] = useState<Video | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchHeroVideo()
      .then(v => { if (mounted) setVideo(v); })
      .catch(e => { if (mounted) setError(e.message); });
    return () => { mounted = false; };
  }, []);

  if (error) {
    return (
      <section className="w-full bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <p className="opacity-80">Konnte das Video nicht laden.</p>
        </div>
      </section>
    );
  }

  if (!video) {
    return (
      <section className="w-full bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <p className="opacity-70">Kein veröffentlichtes Video.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full bg-black">
      <div className="mx-auto max-w-[1600px]">
        <div className="relative w-full">
          {/* Maintain aspect ratio on mobile; fill on desktop */}
          <div className="relative w-full aspect-[16/9] md:aspect-auto md:h-[70vh] lg:h-[80vh]">
            <video
              className="absolute inset-0 h-full w-full object-contain md:object-cover"
              src={video.video}
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              preload="metadata"
            />
          </div>
        </div>
      </div>

      {/* Overlay: artist name bottom-right (desktop), simple + unobtrusive */}
      <div className="pointer-events-none absolute bottom-4 right-4 bg-black/40 text-white px-3 py-1 rounded md:bottom-6 md:right-6">
        <span className="tracking-wide">Linda&nbsp;Güzel</span>
      </div>
    </section>
  );
}
