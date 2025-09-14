"use client";

import { useEffect, useState, useRef } from "react";
import { fetchHeroVideos } from "@/lib/heroVideoApi";
import type { HeroVideo as HeroVideoType } from "@/types/heroVideo";
import { FaChevronLeft, FaChevronRight, FaPen } from "react-icons/fa";
import HeroVideoManagerModal from "./HeroVideoManagerModal";

export default function HeroVideoSection() {
  const [videos, setVideos] = useState<HeroVideoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isManagerOpen, setIsManagerOpen] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Fetch active videos
  const refreshVideos = async () => {
    try {
      const data = await fetchHeroVideos();
      const activeVideos = data.filter((v) => v.is_active && v.video_url);
      setVideos(activeVideos);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshVideos();
  }, []);

  if (loading) return <p className="text-center">Loading hero video…</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (videos.length === 0) return <p className="text-center">No videos available.</p>;

  const handleEnded = () => setCurrentIndex((prev) => (prev + 1) % videos.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % videos.length);

  const video = videos[currentIndex];

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Video */}
      <video
        ref={videoRef}
        key={video.id}
        src={video.video_url || ""}
        muted
        playsInline
        autoPlay
        onEnded={handleEnded}
        className="absolute top-0 left-0 w-full h-full object-contain"
      />

      {/* Title + Description (left side) */}
      <div className="absolute bottom-6 left-6 text-left text-white z-10 max-w-[40%]">
        {video.title && (
          <h2 className="text-xl md:text-2xl font-bold drop-shadow">{video.title}</h2>
        )}
        {video.description && (
          <p className="text-sm md:text-base mt-1 drop-shadow">{video.description}</p>
        )}
      </div>

      {/* Pencil Button (bottom-right) */}
      {!isManagerOpen && (
        <div className="absolute bottom-6 right-6 z-20">
          <button
            onClick={() => setIsManagerOpen(true)}
            className="bg-yellow-500 text-black p-3 rounded-full shadow-lg hover:bg-yellow-400"
            title="Videos verwalten"
          >
            <FaPen size={18} />
          </button>
        </div>
      )}

      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/70 z-10"
      >
        <FaChevronLeft size={20} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/70 z-10"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {videos.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full transition-colors ${
              idx === currentIndex ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Manager Modal */}
      <HeroVideoManagerModal
        isOpen={isManagerOpen}
        onClose={() => {
          setIsManagerOpen(false);
          refreshVideos();
        }}
      />
    </section>
  );
}
