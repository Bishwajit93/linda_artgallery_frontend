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
        setVideos(data);
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
      {video.video_url ? (
        <video
          src={video.video_url}
          autoPlay
          loop
          muted
          playsInline
          controls
          className="w-full h-[500px] object-cover"
        />
      ) : (
        <p className="text-center text-gray-500">No video file available.</p>
      )}
    </div>
  );
}
