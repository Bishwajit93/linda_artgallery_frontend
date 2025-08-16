"use client";

import { useEffect, useRef, useState } from "react";
import { fetchVideos, GalleryVideo } from "@/lib/videoApi";

export default function SequentialVideoPlayer() {
  const [videos, setVideos] = useState<GalleryVideo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [needsTap, setNeedsTap] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Load videos once
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchVideos();
        // only playable ones
        const valid = data.filter(v => v.is_published && !!v.file_url);
        setVideos(valid);
      } catch (err) {
        console.error("Failed to load videos", err);
      }
    })();
  }, []);

  // Try to autoplay when videos first load
  useEffect(() => {
    if (!videos.length || !videoRef.current) return;
    const tryPlay = async () => {
      try {
        await videoRef.current!.play();
        setNeedsTap(false);
      } catch {
        // Mobile browser may block autoplay — show tap overlay
        setNeedsTap(true);
      }
    };
    // load current source then attempt play
    videoRef.current.load();
    tryPlay();
  }, [videos]);

  // When current video ends → go to next (loop)
  const handleEnded = () => {
    if (!videos.length) return;
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  // When index changes, load & attempt play again
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
    videoRef.current.load();
    tryPlay();
  }, [currentIndex, videos.length]);

  if (!videos.length) {
    return <p className="text-center text-gray-500">No published videos yet.</p>;
  }

  const src = videos[currentIndex].file_url || "";

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <video
        key={videos[currentIndex].id}        // force reload on index change
        ref={videoRef}
        src={src}
        className="w-full rounded-lg shadow"
        autoPlay
        muted           // required for mobile autoplay
        playsInline     // required for iOS inline playback
        controls
        preload="auto"
        onEnded={handleEnded}
        onCanPlay={() => {
          // if can play and we previously needed tap, try again
          if (needsTap && videoRef.current) {
            videoRef.current.play().catch(() => {});
          }
        }}
      />

      {/* Big “Tap to play” overlay for mobile if autoplay blocked */}
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
