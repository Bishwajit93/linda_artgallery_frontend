"use client";

import { useEffect, useState, useRef } from "react";
import { fetchVideos } from "@/lib/videoApi";

// Match Django model: file_url can be null
type GalleryVideo = {
  id: number;
  file_url: string | null;
};

export default function SequentialVideoPlayer() {
  const [videos, setVideos] = useState<GalleryVideo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data: GalleryVideo[] = await fetchVideos();

        // filter out videos with no file_url
        const valid = data.filter((v) => v.file_url);
        setVideos(valid);
      } catch (err) {
        console.error("Failed to load videos", err);
      }
    }
    load();
  }, []);

  const handleEnded = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        console.warn("Autoplay blocked by browser.");
      });
    }
  }, [currentIndex]);

  if (videos.length === 0) {
    return <p>No videos available.</p>;
  }

  return (
    <div className="w-full">
        <video
        key={videos[currentIndex].id}
        ref={videoRef}
        src={videos[currentIndex].file_url || ""}
        className="w-full rounded-lg"
        controls
        autoPlay
        muted        // 👈 add this
        playsInline  // 👈 and this
        onEnded={handleEnded}
        />
      <p className="mt-2 text-center text-sm text-gray-500">
        Video {currentIndex + 1} of {videos.length}
      </p>
    </div>
  );
}
