"use client";

import { useEffect, useState } from "react";
import { fetchPublishedImages } from "@/lib/imageApi";
import { Image } from "@/types/image";

export default function ImageGrid() {
  const [items, setItems] = useState<Image[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchPublishedImages()
      .then(data => { if (mounted) setItems(data); })
      .catch(e => { if (mounted) setError(e.message); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <p className="opacity-70">Lade Galerie…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-red-600">Fehler: {error}</p>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <p className="opacity-70">Keine veröffentlichten Bilder.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map(img => (
          <figure key={img.id} className="group">
            <div className="aspect-square overflow-hidden rounded border border-black/10 bg-neutral-100">
              <img
                src={img.image}
                alt={img.title || "Artwork"}
                className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="mt-2 text-sm">
              {img.title || "Ohne Titel"}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
