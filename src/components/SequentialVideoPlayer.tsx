"use client";

import { useEffect, useRef, useState } from "react";
import { fetchVideos, GalleryVideo } from "@/lib/videoApi";

export default function SequentialVideoPlayer() {
  const [videos, setVideos] = useState<GalleryVideo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [needsTap, setNeedsTap] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Load videos from API
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchVideos();
        const valid = data.filter(v => v.is_published && !!v.file_url);
        setVideos(valid);
      } catch (err) {
        console.error("Failed to load videos", err);
      }
    })();
  }, []);

  // Advance to next video when one ends
  const handleEnded = () => {
    if (!videos.length) return;
    setCurrentIndex(prev => (prev + 1) % videos.length);
  };

  // Try autoplay whenever video source changes
  useEffect(() => {
    if (!videoRef.current || !videos.length) return;

    const tryPlay = async () => {
      try {
        await videoRef.current!.play();
        setNeedsTap(false);
      } catch {
        setNeedsTap(true);
      }
    };

    tryPlay();
  }, [currentIndex, videos]);

  if (!videos.length) {
    return <p className="text-center text-gray-500">No published videos yet.</p>;
  }

  const src = videos[currentIndex].file_url || "";

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <video
        key={videos[currentIndex].id} // force reload on index change
        ref={videoRef}
        src={src}
        className="w-full rounded-lg shadow"
        autoPlay
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        onEnded={handleEnded}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            videoRef.current.play().catch(() => setNeedsTap(true));
          }
        }}
      />

      {/* Fallback "Tap to play" overlay for mobile */}
      {needsTap && (
        <button
          onClick={() => {
            if (videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
            setNeedsTap(false);
          }}
          className="absolute inset-0 grid place-items-center bg-black/40 text-white text-lg font-medium"
        >
          Tap to play ▶
        </button>
      )}

      <p className="mt-2 text-center text-sm text-gray-500">
        Video {currentIndex + 1} of {videos.length}
      </p>
    </div>
  );
}
