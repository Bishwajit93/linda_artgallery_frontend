"use client";

import { useEffect, useState } from "react";
import { fetchHeroVideos } from "@/lib/heroVideoApi";
import { HeroVideo as HeroVideoType } from "@/types/heroVideo";

export default function HeroVideo() {
  const [videos, setVideos] = useState<HeroVideoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchHeroVideos();
        console.log("🎥 API returned hero videos:", data);
        setVideos(data.filter((v) => v.video_url));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p className="text-center">Loading hero video…</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (videos.length === 0) return <p className="text-center">No videos available.</p>;

  const video = videos[0];

  return (
    <div className="w-full">
      <video
        key={video.video_url || "fallback"}
        src={video.video_url ?? undefined}   // ✅ null → undefined
        controls
        muted
        playsInline
        autoPlay
        loop
        style={{ width: "100%", height: "500px", backgroundColor: "black" }}
      >
        Sorry, your browser does not support embedded videos.
      </video>
    </div>
  );
}
