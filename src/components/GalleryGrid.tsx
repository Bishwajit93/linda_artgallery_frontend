// components/GalleryGrid.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import type { GalleryImage } from "@/lib/imageApi";

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<GalleryImage | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images
          .filter((img) => img.is_published && img.image_url)
          .map((img) => (
            <button
              key={img.id}
              onClick={() => setActive(img)}
              className="group relative focus:outline-none"
            >
              <div className="aspect-[4/3] relative overflow-hidden rounded-xl">
                <Image
                  src={img.image_url!}
                  alt={img.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="mt-2 text-sm opacity-80">{img.title}</div>
            </button>
          ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-0 text-white/90 hover:text-white"
              onClick={() => setActive(null)}
            >
              Close ✕
            </button>
            <div className="relative w-full h-[70vh] rounded-xl overflow-hidden">
              {active.image_url && (
                <Image
                  src={active.image_url}
                  alt={active.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              )}
            </div>
            {active.description && (
              <p className="mt-3 text-white/80 text-sm">{active.description}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
