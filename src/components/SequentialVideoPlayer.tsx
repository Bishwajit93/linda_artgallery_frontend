// src/components/SequentialVideoPlayer.tsx
"use client";

import { useEffect, useState, useRef } from "react";

interface Video {
  id: number;
  file_url: string;
}

export default function SequentialVideoPlayer() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Fetch videos from backend
  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/videos/`
        );
        if (!res.ok) throw new Error("Failed to fetch videos");
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    }
    loadVideos();
  }, []);

  // Handle when one video ends
  const handleEnded = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  if (videos.length === 0) {
    return <p className="text-gray-500">Keine Videos verfügbar.</p>;
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <video
        key={videos[currentIndex].id} // force reload on index change
        ref={videoRef}
        src={videos[currentIndex].file_url}
        className="w-full rounded-lg shadow-lg"
        controls
        autoPlay
        onEnded={handleEnded}
      />
      <p className="text-center text-sm mt-2 text-gray-600">
        Video {currentIndex + 1} von {videos.length}
      </p>
    </div>
  );
}
