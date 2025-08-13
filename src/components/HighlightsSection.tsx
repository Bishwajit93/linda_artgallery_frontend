"use client";

import { useEffect, useState } from "react";
import { fetchImages, GalleryImage } from "@/lib/imageApi";

export default function HighlightsSection() {
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchImages();
        setImages(data);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  if (!images.length) return null;

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Highlights</h2>
          <span className="text-sm text-neutral-500">Curated pieces</span>
        </div>

        {/* Mobile: horizontal scroll strip */}
        <div className="md:hidden -mx-4 px-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-4">
            {images.map((img) => (
              <figure
                key={img.id}
                className="shrink-0 w-64 rounded-lg overflow-hidden border border-neutral-200/70 bg-white"
                title={img.title}
              >
                <img
                  src={img.image_url || ""}
                  alt={img.title}
                  className="w-full h-44 object-cover"
                />
                <figcaption className="p-3 text-sm">
                  <div className="font-medium line-clamp-1">{img.title}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Desktop: neat grid */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <figure
              key={img.id}
              className="group relative rounded-lg overflow-hidden border border-neutral-200/70 bg-white"
              title={img.title}
            >
              <img
                src={img.image_url || ""}
                alt={img.title}
                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <div className="text-white text-sm font-medium line-clamp-1">
                  {img.title}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
