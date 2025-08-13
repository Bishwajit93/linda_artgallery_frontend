"use client";

import { useEffect, useState } from "react";
import { fetchVideos, GalleryVideo } from "@/lib/videoApi";

export default function VideoGallery() {
  const [videos, setVideos] = useState<GalleryVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideo | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await fetchVideos();
        setVideos(data);
      } catch (error) {
        console.error("Error loading videos:", error);
      }
    };
    loadVideos();
  }, []);

  return (
    <div className="w-full">
      {/* Grid of video thumbnails */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="cursor-pointer relative border border-gray-300 rounded overflow-hidden hover:shadow-lg"
            onClick={() => setSelectedVideo(video)}
          >
            {video.poster_url ? (
              <img
                src={video.poster_url}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                No Poster
              </div>
            )}
            <div className="absolute bottom-0 w-full bg-black/50 text-white p-2 text-sm">
              {video.title}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for playing video */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-black rounded-lg overflow-hidden max-w-4xl w-full">
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-white text-xl px-4 py-2"
              >
                ✕
              </button>
            </div>
            <video
              src={selectedVideo.file_url || ""}
              poster={selectedVideo.poster_url || ""}
              controls
              autoPlay
              className="w-full h-auto"
            />
            <div className="p-4 text-white">
              <h2 className="text-lg font-semibold">{selectedVideo.title}</h2>
              <p className="text-sm mt-2">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
