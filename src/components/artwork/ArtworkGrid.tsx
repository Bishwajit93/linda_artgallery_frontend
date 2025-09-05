"use client";

import { useEffect, useState } from "react";
import { fetchArtworks } from "@/lib/artworkApi";
import { Artwork } from "@/types/artwork";

export default function ArtworkGrid() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchArtworks();
        setArtworks(data);
      } catch (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        err: any
      ) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p className="text-center text-gray-400">Loading artworks…</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {artworks.map((art) => (
        <div
          key={art.id}
          className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
        >
          {art.images.length > 0 && (
            <img
              src={art.images[0].image_url || "/file.svg"}
              alt={art.title || "Artwork"}
              className="w-full h-64 object-cover"
            />
          )}

          <div className="p-4">
            <h3 className="text-lg font-bold mb-2">{art.title || "Untitled"}</h3>
            <p className="text-sm text-gray-600 mb-2">{art.description}</p>
            <span className="inline-block text-xs bg-gray-200 rounded px-2 py-1">
              {art.category}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
